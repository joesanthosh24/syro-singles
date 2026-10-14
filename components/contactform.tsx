"use client";
import { useFormState, useFormStatus } from "react-dom";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/contact/actions";
import DynamicInput from "./dynamic-input";

const initialState: ContactFormState = { status: "idle", message: "" };

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-brand-600 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
};

const ContactForm = () => {
  const [state, formAction] = useFormState(sendContactMessage, initialState);

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
        type="text"
        id="subject"
        name="subject"
        required={true}
        classes="w-full"
        labelFor="subject"
        labelText="Subject"
      />
      <DynamicInput
        type="textarea"
        id="message"
        name="message"
        required={true}
        classes="w-full"
        labelFor="message"
        labelText="Message"
        text="How can we help?"
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

export default ContactForm;
