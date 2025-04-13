import LogoutButton from "@/components/LogoutButton";
import AuthOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  console.log(session);
  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      Click <Link href={"/documents/1212"}>here</Link> to go to document
      <p>{session?.user?.name}</p>
      <LogoutButton />
    </div>
  );
}
