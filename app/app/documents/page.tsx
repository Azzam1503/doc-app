import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import AuthOptions from "@/lib/authOptions";
import { client } from "@/lib/db";
import TemplateGallery from "@/components/TemplateGallery";
import DocumentTable from "@/components/DocumentTable";

const page = async () => {
  const session = await getServerSession(AuthOptions);
  if (!session || !session.user) {
    redirect("/signin");
  }

  const docs = await getDocs(session.user.id);

  return (
    <div>
      <TemplateGallery />
      <DocumentTable documents={docs} />
    </div>
  );
};

export default page;

const getDocs = async (userId: string) => {
  try {
    const documents = await client.permission.findMany({
      where: {
        userId,
        role: "OWNER",
      },
      include: {
        document: {
          select: {
            title: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    console.log(documents);
    return documents;
  } catch (error) {
    console.log("Error while fetching documents", error);
    return [];
  }
};
