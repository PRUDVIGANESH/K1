import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import { PreferencesForm } from "./PreferencesForm";

export default async function PreferencesPage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const prefs = await prisma.userPreference.findUnique({ where: { userId } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Preferences</h1>
      <PreferencesForm
        initialPreferences={
          prefs
            ? {
                roleKeywords: prefs.roleKeywords,
                preferredLocations: prefs.preferredLocations,
                preferredMode: prefs.preferredMode ?? "",
                experienceLevel: prefs.experienceLevel ?? "",
                skills: prefs.skills,
                minMatchScore: prefs.minMatchScore,
              }
            : null
        }
      />
    </div>
  );
}
