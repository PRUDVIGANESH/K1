import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Career Resources</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Guides, tips, and tools to help you succeed in your career.
                </p>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                    <p className="text-gray-500 mb-6">
                        Exclusive resources for our members are being curated. Coming soon!
                    </p>
                    <Link href="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
