"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Briefcase, Menu, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
            <div className="mx-auto max-w-6xl glass rounded-2xl px-6 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary-600 text-white p-2 rounded-lg group-hover:scale-110 transition-transform">
                        <Briefcase size={20} />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">
                        My<span className="text-primary-600">Careers</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/jobs"
                        className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        Find Jobs
                    </Link>
                    <Link
                        href="/companies"
                        className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        Companies
                    </Link>
                    <Link
                        href="/resources"
                        className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                    >
                        Resources
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {session?.user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-gray-600 font-medium">
                                    Dashboard
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full bg-gray-100 hover:bg-gray-200"
                                    >
                                        <User className="h-5 w-5 text-gray-600" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-red-600 cursor-pointer"
                                        onClick={() => signOut()}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" className="text-gray-600 font-medium">
                                    Log in
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button className="rounded-full shadow-primary-500/30">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                <div className="md:hidden flex items-center gap-4">
                    {session?.user && (
                        <Link href="/dashboard">
                            <Button variant="ghost" size="sm">Dashboard</Button>
                        </Link>
                    )}
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
