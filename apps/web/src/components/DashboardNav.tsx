"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { User } from "next-auth";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/jobs", label: "Job Tracker" },
  { href: "/dashboard/resumes", label: "Resumes" },
  { href: "/dashboard/readiness", label: "Readiness" },
  { href: "/dashboard/notifications", label: "Notifications" },
  { href: "/dashboard/analytics", label: "Analytics" },
];

export function DashboardNav({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-2 space-y-1">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`block px-3 py-2 rounded-lg text-sm font-medium ${
            pathname === href
              ? "bg-primary-50 text-primary-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {label}
        </Link>
      ))}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <p className="px-3 py-1 text-xs text-gray-500 truncate" title={user.email ?? ""}>
          {user.email}
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full mt-2 text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}
