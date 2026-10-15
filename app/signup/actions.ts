"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SignUpFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const CREATED_BY_OPTIONS = ["self", "parent-guardian"];

const field = (formData: FormData, name: string) => {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
};

export async function signUp(
  _prevState: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> {
  const fullName = field(formData, "name");
  const email = field(formData, "email");
  const createdBy = field(formData, "created-by");
  const parish = field(formData, "parish");
  // Passwords aren't trimmed; spaces are allowed
  const password = formData.get("password");

  if (!fullName || !email || !createdBy || !parish || !password) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (typeof password !== "string") {
    return { status: "error", message: "Please enter a valid password." };
  }
  if (!CREATED_BY_OPTIONS.includes(createdBy)) {
    return { status: "error", message: "Please choose who is creating this profile." };
  }

  const supabase = createClient();
  const origin = headers().get("origin");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Saved on the user and copied into public.profiles by a trigger
      data: { full_name: fullName, created_by: createdBy, parish },
      emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
    },
  });

  if (error) {
    console.error("Sign up failed:", error.status, error.message);
    return { status: "error", message: error.message };
  }

  // A session is only returned when email confirmation is turned off;
  // otherwise the confirmation link signs the user in via /auth/callback
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }

  return {
    status: "success",
    message: `Check ${email} for a link to confirm your account.`,
  };
}
