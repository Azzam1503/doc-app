"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const session = useSession();
  console.log(session.data);
  // if (!session.data) {
  //   router.push("/signin");
  // }

  return <div>Hello there</div>;
};

export default page;
