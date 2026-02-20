import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import { JobListEnhanced } from "@/components/jobs/job-list-enhanced";
import { calculateMatchScore } from "@kodnest/shared";
import type { JobCardItem } from "@/components/jobs/job-card";

export default async function JobsPage() {
  const session = await getSession();
  if (!session?.user?.email) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const [savedJobs, userPrefs] = await Promise.all([
    prisma.savedJob.findMany({
      where: { userId },
      include: { job: true },
      orderBy: { savedAt: "desc" },
    }),
    prisma.userPreference.findUnique({ where: { userId } }),
  ]);

  const items: JobCardItem[] = savedJobs.map((s) => {
    const prefs = userPrefs
      ? {
          roleKeywords: userPrefs.roleKeywords,
          preferredLocations: userPrefs.preferredLocations,
          preferredMode: userPrefs.preferredMode,
          experienceLevel: userPrefs.experienceLevel,
          skills: userPrefs.skills,
          minMatchScore: userPrefs.minMatchScore,
        }
      : null;

    const matchScore = prefs
      ? calculateMatchScore(
          {
            title: s.job.title,
            description: s.job.description,
            location: s.job.location,
            mode: s.job.mode,
            experienceLevel: s.job.experienceLevel,
            skills: s.job.skills,
            salaryMin: s.job.salaryMin,
            salaryMax: s.job.salaryMax,
          },
          prefs
        ).score
      : undefined;

    return {
      id: s.job.id,
      savedJobId: s.id,
      title: s.job.title,
      company: s.job.company,
      url: s.job.url,
      description: s.job.description,
      location: s.job.location,
      mode: s.job.mode,
      experienceLevel: s.job.experienceLevel,
      skills: s.job.skills,
      salaryMin: s.job.salaryMin,
      salaryMax: s.job.salaryMax,
      salaryCurrency: s.job.salaryCurrency,
      status: s.status,
      appliedAt: s.appliedAt?.toISOString() ?? null,
      savedAt: s.savedAt.toISOString(),
      matchScore,
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Tracker</h1>
      <JobListEnhanced items={items} />
    </div>
  );
}
