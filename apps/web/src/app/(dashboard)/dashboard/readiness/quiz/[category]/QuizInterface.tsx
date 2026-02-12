"use client";

import { useState, useEffect } from "react";
import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer, CheckCircle2, XCircle, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function QuizInterface({ questions, category }: { questions: Question[]; category: string }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        if (isSubmitted) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsSubmitted(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isSubmitted]);

    const handleAnswerSelect = (optionIndex: number) => {
        if (isSubmitted) return;
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setSelectedAnswers(newAnswers);
    };

    const calculateScore = () => {
        return questions.reduce((score, q, index) => {
            return score + (selectedAnswers[index] === q.correctAnswer ? 1 : 0);
        }, 0);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (isSubmitted) {
        const score = calculateScore();
        const percentage = Math.round((score / questions.length) * 100);

        return (
            <div className="max-w-3xl mx-auto py-8 px-4">
                <Card className="mb-8 border-primary-100 bg-primary-50">
                    <CardContent className="pt-6 text-center">
                        <h2 className="text-2xl font-bold text-primary-900 mb-2">Quiz Completed!</h2>
                        <p className="text-4xl font-bold text-primary-600 mb-4">{percentage}%</p>
                        <p className="text-gray-600">
                            You answered {score} out of {questions.length} questions correctly.
                        </p>
                        <Link href="/dashboard/readiness">
                            <Button className="mt-6">Back to Readiness</Button>
                        </Link>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {questions.map((q, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === q.correctAnswer;

                        return (
                            <Card key={q.id} className={`border ${isCorrect ? "border-green-200" : "border-red-200"}`}>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-medium flex gap-3">
                                        <span className="text-gray-500">Q{index + 1}.</span>
                                        {q.text}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 mb-4">
                                        {q.options.map((opt, i) => (
                                            <div key={i} className={`p-3 rounded-lg text-sm border ${i === q.correctAnswer
                                                    ? "bg-green-50 border-green-200 text-green-800 font-medium"
                                                    : i === userAnswer
                                                        ? "bg-red-50 border-red-200 text-red-800"
                                                        : "bg-gray-50 border-gray-100 text-gray-500"
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    {i === q.correctAnswer && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                                                    {i === userAnswer && i !== q.correctAnswer && <XCircle className="h-4 w-4 text-red-600" />}
                                                    {opt}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                                            <div>
                                                <span className="font-semibold block mb-1">Explanation:</span>
                                                {q.explanation}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 h-[calc(100vh-80px)] flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">{category} Quiz</h1>
                    <p className="text-sm text-gray-500">Question {currentQuestionIndex + 1} of {questions.length}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-medium ${timeLeft < 60 ? "bg-red-100 text-red-600" : "bg-primary-50 text-primary-700"}`}>
                    <Timer className="h-4 w-4" />
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div
                    className="h-full bg-primary-600 transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
            </div>

            {/* Question Card */}
            <Card className="flex-1 flex flex-col mb-6">
                <CardHeader>
                    <CardTitle className="text-xl leading-relaxed">
                        {currentQuestion.text}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <div
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${selectedAnswers[currentQuestionIndex] === index
                                        ? "border-primary-600 bg-primary-50 hover:bg-primary-50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedAnswers[currentQuestionIndex] === index
                                            ? "border-primary-600 bg-primary-600"
                                            : "border-gray-300"
                                        }`}>
                                        {selectedAnswers[currentQuestionIndex] === index && (
                                            <div className="h-2 w-2 bg-white rounded-full" />
                                        )}
                                    </div>
                                    <span className={selectedAnswers[currentQuestionIndex] === index ? "text-primary-900 font-medium" : "text-gray-700"}>
                                        {option}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center bg-white p-4 border rounded-xl shadow-sm">
                <Button
                    variant="ghost"
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </Button>

                {currentQuestionIndex === questions.length - 1 ? (
                    <Button onClick={() => setIsSubmitted(true)} className="px-8 bg-green-600 hover:bg-green-700">
                        Submit Quiz
                    </Button>
                ) : (
                    <Button onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}>
                        Next Question <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
