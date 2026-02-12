import { FileText, Target, TrendingUp, Users, Shield, Zap } from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "Resume Manager",
        description: "Create, edit, and tailor your resumes for every job application with our advanced editor.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: Target,
        title: "Job Tracker",
        description: "Keep track of every application status, interview date, and hiring manager contact.",
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: TrendingUp,
        title: "Career Analytics",
        description: "Visualize your progress with detailed charts and insights to optimize your strategy.",
        color: "bg-emerald-50 text-emerald-600",
    },
    {
        icon: Users,
        title: "Community Insights",
        description: "See where others are applying and get salary benchmarks for your target roles.",
        color: "bg-amber-50 text-amber-600",
    },
    {
        icon: Shield,
        title: "Secure Data",
        description: "Your career data is private and encrypted. Export your data anytime you want.",
        color: "bg-rose-50 text-rose-600",
    },
    {
        icon: Zap,
        title: "AI Suggestions",
        description: "Get smart recommendations for improving your resume and cover letters instantly.",
        color: "bg-cyan-50 text-cyan-600",
    },
];

export function FeatureSection() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-6xl mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful tools designed to help you land your dream job faster and with less stress.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 group cursor-default"
                        >
                            <div className={`h-12 w-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
