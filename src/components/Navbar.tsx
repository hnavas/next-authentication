import Link from "next/link";
import { getServerSession } from "next-auth";
async function Navbar() {

  const session = await getServerSession();

  return (
    <nav className="relative flex  py-2 text-neutral-400 inset-0 bg-gradient-to-r from-orange-100 to-orange-600 shadow-lg lg:flex-wrap lg:justify-between lg:py-4" >
      <div className="flex justify-between container mx-auto">
        <Link href="/" className="font-bold text-2xl">
          <h1>NextAuth</h1>
        </Link>
        <ul className="list-style-none flex gap-x-2 font-bold text-neutral-200">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/about">About</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/api/auth/signout">SignOut</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-3 py-1">
                <Link href="/about">About</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/login">SignIn</Link>
              </li>
              <li className="px-3 py-1">
                <Link href="/register">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
