import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await getServerSession();
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
          {session?.user ? (
            <LogoutButton />
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
