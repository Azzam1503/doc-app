import React from "react";
import { Button } from "./ui/button";

const googleSignInBtn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Button
      onClick={() => console.log("hello there")}
      className="w-full mb-2 py-4"
    >
      {children}
    </Button>
  );
};

export default googleSignInBtn;
