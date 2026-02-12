import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import { JobList } from "./JobList";
import { AddJobForm } from "./AddJobForm";

export default async function JobsPage() {
  const session = await getSession();
  if (!session?.user?.email) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const savedJobs = await prisma.savedJob.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { savedAt: "desc" },
  });

  const items = savedJobs.map((s) => ({
    id: s.job.id,
    savedJobId: s.id,
    title: s.job.title,
    company: s.job.company,
    url: s.job.url,
    description: s.job.description,
    status: s.status,
    appliedAt: s.appliedAt?.toISOString() ?? null,
    savedAt: s.savedAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Tracker</h1>
      <AddJobForm />
      <div className="mt-6">
        <JobList items={items} />
      </div>
    </div>
  );
}
