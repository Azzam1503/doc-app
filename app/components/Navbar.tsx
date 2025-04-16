"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import Access from "./Access";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isDocumentPage =
    pathname?.startsWith("/documents/") && pathname.split("/").length === 3;

  return (
    <div className="flex justify-between items-center py-2 px-6 bg-gray-800 text-white">
      <h3>Doc-app</h3>
      <nav className="flex items-center">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/documents">Documents</Link>
          </li>
          {isDocumentPage && (
            <>
              <li>
                <Access />
              </li>
              <li>
                <button className="text-blue-300">History</button>
              </li>
            </>
          )}

          {status === "loading" ? null : session?.user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
