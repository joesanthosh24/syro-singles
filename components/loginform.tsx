"use client";
import { useFormState, useFormStatus } from "react-dom";
import { logIn, type LogInFormState } from "@/app/login/actions";
import DynamicInput from "./dynamic-input";

const initialState: LogInFormState = { status: "idle", message: "" };

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Logging in..." : "Log In"}
    </button>
  );
};

const LogInForm = () => {
  const [state, formAction] = useFormState(logIn, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <DynamicInput
        type="email"
        id="email"
        name="email"
        required={true}
        classes="w-full"
        labelFor="email"
        labelText="Email"
        text="you@example.com"
      />
      <DynamicInput
        type="password"
        id="password"
        name="password"
        required={true}
        classes="w-full"
        labelFor="password"
        labelText="Password"
      />
      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.message}
        </p>
      )}
      {state.status === "unconfirmed" && (
        <p
          role="status"
          className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800"
        >
          {state.message}
        </p>
      )}
      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
};

export default LogInForm;
