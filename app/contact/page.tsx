import type { Metadata } from "next";
import ContactForm from "@/components/contactform";

export const metadata: Metadata = {
  title: "Contact | Syro Singles",
  description: "Get in touch with the Syro Singles team.",
};

const ContactPage = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
        <h1 className="text-center font-display text-3xl font-semibold text-brand-900">
          Get in touch
        </h1>
        <p className="mb-8 mt-2 text-center text-sm text-slate-500">
          Have a question or some feedback? Send us a message.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
