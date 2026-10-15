import type { Metadata } from "next";
import Link from "next/link";
import LogInForm from "@/components/loginform";

export const metadata: Metadata = {
  title: "Log In | Syro Singles",
};

type PageProps = {
  searchParams: { error?: string };
};

const LogInPage = ({ searchParams }: PageProps) => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
        <h1 className="text-center font-display text-3xl font-semibold text-brand-900">
          Welcome back
        </h1>
        <p className="mb-8 mt-2 text-center text-sm text-slate-500">
          Log in to your account.
        </p>
        {searchParams.error === "confirmation" && (
          <p
            role="status"
            className="mb-6 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800"
          >
            We couldn&apos;t sign you in from that link. If your email is
            confirmed, log in below. If not, logging in will send you a new
            link.
          </p>
        )}
        <LogInForm />
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
