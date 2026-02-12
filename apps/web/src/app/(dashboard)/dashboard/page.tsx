import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.user?.email) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const [savedJobs, resumes, notifications, readiness] = await Promise.all([
    prisma.savedJob.count({ where: { userId } }),
    prisma.resume.count({ where: { userId } }),
    prisma.notification.count({ where: { userId, read: false } }),
    prisma.readinessScore.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const stats = [
    { label: "Saved jobs", value: savedJobs, href: "/dashboard/jobs" },
    { label: "Resumes", value: resumes, href: "/dashboard/resumes" },
    { label: "Unread notifications", value: notifications, href: "/dashboard/notifications" },
    { label: "Latest readiness score", value: readiness?.overall ?? "—", href: "/dashboard/readiness" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, href }) => (
          <Link
            key={href}
            href={href}
            className="block p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
