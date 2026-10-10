import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <Image
        src="/syromalabar_logo.png"
        alt=""
        width={96}
        height={96}
        priority
      />
      <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-brand-900 text-balance sm:text-6xl">
        Meet someone who shares your faith
      </h1>
      <p className="mt-6 max-w-xl text-lg text-slate-600 text-balance">
        A place for singles from Syro-Malabar parishes to connect. Create a
        profile for yourself, or for a son or daughter.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/signup"
          className="rounded-full bg-brand-600 px-8 py-3 font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Create a profile
        </Link>
        <Link
          href="/about"
          className="rounded-full border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
}
