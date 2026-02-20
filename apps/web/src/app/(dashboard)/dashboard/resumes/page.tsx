import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ResumesPage() {
  const session = await getSession();
  if (!session?.user?.email) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const resumes = await prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resumes</h1>
        <Link
          href="/dashboard/resumes/new"
          className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes yet.</p>
      ) : (
        <ul className="space-y-3">
          {resumes.map((r) => (
            <li key={r.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900 truncate">{r.title}</h2>
                <p className="text-sm text-gray-500">
                  Updated {new Date(r.updatedAt).toLocaleDateString()}
                  {r.atsScore != null && (
                    <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      ATS {r.atsScore}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  href={`/dashboard/resumes/builder?id=${r.id}`}
                  className="text-sm text-primary-600 hover:underline font-medium"
                >
                  Builder
                </Link>
                <Link
                  href={`/dashboard/resumes/${r.id}`}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
