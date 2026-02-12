import { questions, Question } from "@/data/questions";

// Simple seeded random number generator
function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function getDailyQuestions(category: string, date: Date = new Date()): Question[] {
    // Filter questions by category
    const categoryQuestions = questions.filter((q) => q.category === category);

    if (categoryQuestions.length === 0) {
        return [];
    }

    // Create a seed based on the date (YYYY-MM-DD)
    // This ensures everyone gets the same questions for the same day
    const dateString = date.toISOString().split("T")[0];
    const seedString = `${dateString}-${category}`;

    // Convert string to number hash
    let seed = 0;
    for (let i = 0; i < seedString.length; i++) {
        seed = (seed << 5) - seed + seedString.charCodeAt(i);
        seed |= 0; // Convert to 32bit integer
    }

    // Shuffle array using Fisher-Yates with seeded random
    const shuffled = [...categoryQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return top 25 (or fewer if not enough questions)
    // In our sample data we only have 5, so it will return up to 25.
    return shuffled.slice(0, 25);
}
