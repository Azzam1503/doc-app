import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const googleSignInBtn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "http://localhost:3000/documents",
        })
      }
      className="w-full mb-2 py-4"
    >
      {children}
    </Button>
  );
};

export default googleSignInBtn;
