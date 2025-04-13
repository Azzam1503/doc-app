"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <button
        onClick={() => {
          signOut({
            callbackUrl: "/",
          });
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
