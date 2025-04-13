import SignIn from "@/components/SignIn";
import AuthOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(AuthOptions);
  console.log("----------------------------------");
  console.log("sessss", session);
  if (session?.user) {
    redirect("/");
  }
  return <SignIn />;
};

export default page;
