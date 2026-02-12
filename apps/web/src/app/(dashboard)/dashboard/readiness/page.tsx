import { getSession } from "@/lib/auth";
import { prisma } from "@kodnest/db";
import { redirect } from "next/navigation";
import { ReadinessCard } from "./ReadinessCard";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Laptop, Cloud, Network, Brain, FileCode, Code2, Terminal, Coffee, ArrowRight } from "lucide-react";

const categories = [
  { id: "aptitude", name: "Aptitude", icon: Brain, color: "text-purple-600", bg: "bg-purple-50" },
  { id: "software-dev", name: "Software Dev", icon: Laptop, color: "text-pink-600", bg: "bg-pink-50" },
  { id: "cloud", name: "Cloud Computing", icon: Cloud, color: "text-sky-600", bg: "bg-sky-50" },
  { id: "networking", name: "Networking", icon: Network, color: "text-indigo-600", bg: "bg-indigo-50" },
  { id: "sql", name: "SQL", icon: Database, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "html", name: "HTML", icon: FileCode, color: "text-orange-600", bg: "bg-orange-50" },
  { id: "css", name: "CSS", icon: FileCode, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "javascript", name: "JavaScript", icon: Code2, color: "text-yellow-600", bg: "bg-yellow-50" },
  { id: "python", name: "Python", icon: Terminal, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "c-programming", name: "C Language", icon: FileCode, color: "text-slate-600", bg: "bg-slate-50" },
  { id: "java", name: "Java", icon: Coffee, color: "text-red-600", bg: "bg-red-50" },
];

export default async function ReadinessPage() {
  const session = await getSession();
  if (!session?.user) redirect("/login");
  const userId = (session.user as { id?: string }).id;
  if (!userId) redirect("/login");

  const latest = await prisma.readinessScore.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Readiness Assessment</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ReadinessCard
            score={latest?.overall ?? null}
            breakdown={(latest?.breakdown as Record<string, number>) ?? null}
            createdAt={latest?.createdAt.toISOString() ?? null}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Challenges</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/dashboard/readiness/quiz/${cat.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {cat.name}
                  </CardTitle>
                  <cat.icon className={`h-4 w-4 ${cat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-500 mb-2">25 Questions • 25 Minutes</div>
                  <div className={`text-xs font-medium ${cat.color} bg-opacity-10 px-2 py-1 rounded inline-block ${cat.bg}`}>
                    Start Quiz <ArrowRight className="inline h-3 w-3 ml-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
