import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="h-16 bg-slate-50 w-full flex px-4 items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="m-2">
          <Link href="/">
            <Image src="/syromalabar_logo.png" alt="Logo" width={50} height={40} />
          </Link>
        </div>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div>
        <Link href="/signup">Sign Up</Link>
      </div>
     </nav>
  )
}

export default Navbar