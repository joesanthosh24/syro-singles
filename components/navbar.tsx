import Link from "next/link";
import Image from "next/image";
import { logOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

const linkClasses =
  "rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700 transition-colors";

const buttonClasses =
  "rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-10 h-16 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/syromalabar_logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
            <span className="hidden font-display text-xl font-semibold text-brand-800 sm:inline">
              Syro Singles
            </span>
          </Link>
          <div className="flex items-center">
            {user && (
              <Link href="/dashboard" className={linkClasses}>
                Dashboard
              </Link>
            )}
            <Link href="/about" className={linkClasses}>
              About
            </Link>
            <Link href="/contact" className={linkClasses}>
              Contact
            </Link>
          </div>
        </div>
        {user ? (
          <form action={logOut}>
            <button type="submit" className={buttonClasses}>
              Log Out
            </button>
          </form>
        ) : (
          <Link href="/signup" className={buttonClasses}>
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
