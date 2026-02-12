"use client";

import { Button } from "../ui/button";
import { MoveRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function HeroSection() {
    const { data: session } = useSession();

    return (
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-48 md:pb-32">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-200/30 rounded-full blur-3xl -z-10 opacity-50" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-secondary-200/30 rounded-full blur-3xl -z-10 opacity-30" />

            <div className="max-w-6xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6 animate-fade-in border border-primary-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        New features available
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                        Launch Your Career <br className="hidden md:block" />
                        <span className="text-gradient">With Confidence</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        The all-in-one platform to track applications, manage resumes, and benchmark your skills against the industry's best.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        {session?.user ? (
                            <Link href="/dashboard">
                                <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform duration-200">
                                    Go to Dashboard <MoveRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/register">
                                <Button size="lg" className="rounded-full h-14 px-8 text-lg shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform duration-200">
                                    Get Started Free <MoveRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        )}

                        <Link href="/demo">
                            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg hover:bg-gray-50">
                                View Demo
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500 font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-primary-600 h-5 w-5" /> Free for students
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-primary-600 h-5 w-5" /> No credit card required
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-primary-600 h-5 w-5" /> Secure & Private
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
