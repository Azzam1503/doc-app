import { getServerSession } from "next-auth";
import Editor from "./editor";
import AuthOptions from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { client } from "@/lib/db";

const page = async ({ params }: any) => {
  console.log(params);
  const sesssion = await getServerSession(AuthOptions);
  if (!sesssion || !sesssion.user) {
    return redirect("/signin");
  }
  const { documentId } = await params;

  const permission = await client.permission.findFirst({
    where: {
      userId: sesssion.user.id,
      documentId,
    },
  });

  console.log(permission);

  if (!permission) redirect("/");
  return <Editor />;
};

export default page;
