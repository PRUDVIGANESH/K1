import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const [savedJobs, applications, resumes, readiness, unreadNotif] =
    await Promise.all([
      prisma.savedJob.count({ where: { userId } }),
      prisma.savedJob.count({
        where: { userId, status: { not: "saved" } },
      }),
      prisma.resume.count({ where: { userId } }),
      prisma.readinessScore.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.notification.count({ where: { userId, read: false } }),
    ]);

  const stats = [
    { label: "Saved jobs", value: savedJobs },
    { label: "Applications (non-saved)", value: applications },
    { label: "Resumes", value: resumes },
    { label: "Latest readiness", value: readiness?.overall ?? "—" },
    { label: "Unread notifications", value: unreadNotif },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
