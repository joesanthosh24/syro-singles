"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LogInFormState = {
  status: "idle" | "error" | "unconfirmed";
  message: string;
};

export async function logIn(
  _prevState: LogInFormState,
  formData: FormData,
): Promise<LogInFormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!email.trim() || !password) {
    return { status: "error", message: "Please fill in every field." };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error?.code === "email_not_confirmed") {
    return resendConfirmation(email.trim());
  }
  if (error) {
    console.error("Log in failed:", error.status, error.message);
    return { status: "error", message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

// Sends a new confirmation link that signs the user in and opens the
// dashboard via /auth/callback
const resendConfirmation = async (email: string): Promise<LogInFormState> => {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) {
    console.error("Resending confirmation failed:", error.status, error.message);
    return {
      status: "unconfirmed",
      message: `You need to confirm your email before logging in. We couldn't send a new link just now (${error.message}), so use the link in your earlier email to ${email}, or try again later.`,
    };
  }

  return {
    status: "unconfirmed",
    message: `You need to confirm your email before logging in. We've sent a new link to ${email}. Open it in this browser and it will take you to your dashboard.`,
  };
};
