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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Resumes</h1>
      <Link
        href="/dashboard/resumes/new"
        className="inline-block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 mb-6"
      >
        New resume
      </Link>
      {resumes.length === 0 ? (
        <p className="text-gray-500">No resumes yet.</p>
      ) : (
        <ul className="space-y-3">
          {resumes.map((r) => (
            <li key={r.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <Link href={`/dashboard/resumes/${r.id}`} className="block">
                <h2 className="font-semibold text-gray-900">{r.title}</h2>
                <p className="text-sm text-gray-500">
                  Updated {new Date(r.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
