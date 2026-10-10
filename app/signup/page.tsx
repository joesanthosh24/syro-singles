import Link from "next/link";
import SignUpForm from "@/components/signupform";

const SignUpPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
        <h2 className="text-center font-display text-3xl font-semibold text-brand-900">
          Create your account
        </h2>
        <p className="mb-8 mt-2 text-center text-sm text-slate-500">
          It only takes a minute to get started.
        </p>
        <SignUpForm />
        {/* Link to Login Page */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
