"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

// Default recipient for now; override with CONTACT_EMAIL
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "syrosingles@gmail.com";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Syro Singles <onboarding@resend.dev>";

const field = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = field(formData, "name");
  const email = field(formData, "email");
  const subject = field(formData, "subject");
  const message = field(formData, "message");

  if (!name || !email || !subject || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return {
      status: "error",
      message: "We couldn't send your message. Please try again later.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `Contact form: ${subject.replace(/\s+/g, " ")}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!response.ok) {
      console.error(
        "Contact form: Resend responded",
        response.status,
        await response.text(),
      );
      return {
        status: "error",
        message: "We couldn't send your message. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Contact form: failed to reach Resend", error);
    return {
      status: "error",
      message: "We couldn't send your message. Please try again later.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out. We'll get back to you soon.",
  };
}
