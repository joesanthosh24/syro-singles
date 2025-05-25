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
    <form className="space-y-3">
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
      />
      <DynamicInput
        type="radio"
        name="creating-for"
        required={true}
        labelText="Created By"
        radioBtns={[
          { text: " Self", id: "self" },
          { text: " Parent / Guardian", id: "parent-guardian" },
        ]}
      />
      <DynamicInput
        labelFor="parish"
        type="select"
        id="parish"
        classes="w-full"
        name="parish"
        required={true}
        options={[
          "St. Alphonsa Cathedral, Mississauga",
          "St. Mother Teresa Syro Malabar, Ottawa",
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
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 focus:outline-none "
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
