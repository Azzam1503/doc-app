import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import AuthOptions from "@/lib/authOptions";
import { client } from "@/lib/db";

const page = async () => {
  const session = await getServerSession(AuthOptions);
  if (!session || !session.user) {
    redirect("/signin");
  }

  const docs = await getDocs(session.user.id);

  return (
    <div>
      <div>
        <h2>Your Documents</h2>
        <ul>
          {docs.map((doc: any) => (
            <li
              key={doc.documentId}
              className="h-[180px] bg-red-300 w-[280px] rounded"
            >
              <Link href={`/documents/${doc.documentId}`}>{doc.id}</Link>
            </li>
          ))}
        </ul>
      </div>
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
    });
    console.log(documents);
    return documents;
  } catch (error) {
    console.log("Error while fetching documents", error);
    return [];
  }
};
