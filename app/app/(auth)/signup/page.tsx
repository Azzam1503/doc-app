import SignUp from "@/components/SignUp";
import AuthOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(AuthOptions);
  if (session?.user) {
    redirect("/");
  }
  return <SignUp />;
};

export default page;
