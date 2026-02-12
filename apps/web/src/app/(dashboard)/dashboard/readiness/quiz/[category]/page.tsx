import { QuizInterface } from "./QuizInterface";
import { getDailyQuestions } from "@/lib/quiz-engine";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function QuizPage({ params }: { params: { category: string } }) {
    const session = await getSession();
    if (!session?.user) redirect("/login");

    const questions = getDailyQuestions(params.category);

    if (questions.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                <h1 className="text-2xl font-bold mb-4">No Questions Found</h1>
                <p>We couldn't find any questions for the category "{params.category}".</p>
            </div>
        );
    }

    return <QuizInterface questions={questions} category={params.category} />;
}
