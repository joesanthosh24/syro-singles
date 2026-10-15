import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard | Syro Singles",
};

const CREATED_BY_LABELS: Record<string, string> = {
  self: "Self",
  "parent-guardian": "Parent / Guardian",
};

const DashboardPage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already redirects signed-out visitors; this is a fallback
  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("full_name, gender, created_by, parish")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Loading profile failed:", error.message);
  }

  const details = [
    { label: "Email", value: user.email },
    {
      label: "Gender",
      value: profile?.gender
        ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
        : null,
    },
    {
      label: "Created by",
      value: profile?.created_by
        ? CREATED_BY_LABELS[profile.created_by] ?? profile.created_by
        : null,
    },
    { label: "Parish", value: profile?.parish },
  ];

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-brand-900">
        {profile?.full_name ? `Welcome, ${profile.full_name}` : "Welcome"}
      </h1>
      <p className="mt-3 text-slate-600">
        This is your dashboard. More is on the way.
      </p>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-brand-900">
          Your profile
        </h2>
        <dl className="mt-6 divide-y divide-slate-200">
          {details.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between"
            >
              <dt className="text-sm font-medium text-slate-500">{label}</dt>
              <dd className="text-slate-900">{value || "Not set"}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default DashboardPage;
