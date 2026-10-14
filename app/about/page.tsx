import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Syro Singles",
  description:
    "Syro Singles helps singles from Syro-Malabar parishes meet someone who shares their faith.",
};

const steps = [
  {
    title: "Create a profile",
    description:
      "Sign up for yourself, or on behalf of a son or daughter who is looking to meet someone.",
  },
  {
    title: "Find your community",
    description:
      "Browse singles from Syro-Malabar parishes who share your faith and traditions.",
  },
  {
    title: "Start a conversation",
    description:
      "Reach out when someone stands out, and get to know each other at your own pace.",
  },
];

const AboutPage = () => {
  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-brand-900 text-balance sm:text-5xl">
          About Syro Singles
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 text-balance">
          Finding someone who shares your faith, your traditions and your
          community shouldn&apos;t be left to chance. Syro Singles is a place
          for singles from Syro-Malabar parishes to connect.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-brand-900">
          Why we&apos;re here
        </h2>
        <p className="mt-4 text-slate-600">
          Our parishes are spread across cities and countries, and it can be
          hard to meet people outside your own. Syro Singles brings those
          communities together in one place, so that faith and family are part
          of the conversation from the start.
        </p>
        <p className="mt-4 text-slate-600">
          Families have always played a part in how our community finds a
          match. That&apos;s why parents can create a profile for a son or
          daughter, as well as singles creating one for themselves.
        </p>
      </div>

      <h2 className="mt-12 text-center font-display text-2xl font-semibold text-brand-900">
        How it works
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
              {index + 1}
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/signup"
          className="rounded-full bg-brand-600 px-8 py-3 font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Create a profile
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
