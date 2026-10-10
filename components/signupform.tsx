"use client";
import { useState } from "react";
import DynamicInput from "./dynamic-input";

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    createdBy: "",
    password: "",
  });

  return (
    <form className="space-y-5">
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
      <div className="pt-2">
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
