import Link from "next/link";
import { Briefcase, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                            <Briefcase size={20} />
                        </div>
                        <span className="font-bold text-xl text-gray-900">MyCareers</span>
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Empowering your career journey with the best tools to track, manage, and succeed.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link href="#" className="hover:text-primary-600">Features</Link></li>
                        <li><Link href="#" className="hover:text-primary-600">Pricing</Link></li>
                        <li><Link href="#" className="hover:text-primary-600">Security</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li><Link href="#" className="hover:text-primary-600">Blog</Link></li>
                        <li><Link href="#" className="hover:text-primary-600">Career Guides</Link></li>
                        <li><Link href="#" className="hover:text-primary-600">Help Center</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                    <div className="flex gap-4">
                        <Link href="#" className="text-gray-400 hover:text-primary-600"><Twitter size={20} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-primary-600"><Linkedin size={20} /></Link>
                        <Link href="#" className="text-gray-400 hover:text-primary-600"><Github size={20} /></Link>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between text-sm text-gray-500">
                <p>© 2024 MyCareers. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-gray-900">Privacy Policy</Link>
                    <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
