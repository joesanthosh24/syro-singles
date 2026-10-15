"use client";
import { useFormState, useFormStatus } from "react-dom";
import { signUp, type SignUpFormState } from "@/app/signup/actions";
import DynamicInput from "./dynamic-input";

const initialState: SignUpFormState = { status: "idle", message: "" };

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing up..." : "Sign Up"}
    </button>
  );
};

const SignUpForm = () => {
  const [state, formAction] = useFormState(signUp, initialState);

  if (state.status === "success") {
    return (
      <p
        role="status"
        className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-6 text-center text-sm font-medium text-brand-800"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <DynamicInput
        type="text"
        id="name"
        name="name"
        required={true}
        classes="w-full"
        labelFor="name"
        labelText="Full Name"
      />
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
        type="radio"
        name="created-by"
        required={true}
        labelText="Created By"
        radioBtns={[
          { text: "Self", id: "self" },
          { text: "Parent / Guardian", id: "parent-guardian" },
        ]}
      />
      <DynamicInput
        labelFor="parish"
        labelText="Parish"
        type="select"
        id="parish"
        classes="w-full"
        name="parish"
        required={true}
        text="Select your parish"
        options={[
          {name: "St. Alphonsa Cathedral, Mississauga", id: 1},
          {name: "St. Mother Teresa Syro Malabar, Ottawa", id: 2},
        ]}
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
      <div className="pt-2">
        <SubmitButton />
      </div>
    </form>
  );
};

export default SignUpForm;
