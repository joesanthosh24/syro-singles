import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase redirects here from the confirmation email with a one-time code
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
    console.error("Email confirmation failed:", error.message);
  }

  // e.g. the link was opened in a different browser, or has expired
  return NextResponse.redirect(`${origin}/login?error=confirmation`);
}
