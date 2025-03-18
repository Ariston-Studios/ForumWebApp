import { useEffect, useState } from "react";

interface Question {
    id: number;
    title: string;
    body: string;
    users: string;
    created_at: string;
}

const sampleQuestions: Question[] = [
    {
        id: 1,
        title: "How does useEffect work in React?",
        body: "I am trying to understand how useEffect works. When does it run, and how can I control it?",
        users: "JohnDoe",
        created_at: new Date().toISOString(),
    },
    {
        id: 2,
        title: "What is the difference between var, let, and const?",
        body: "I keep getting confused between var, let, and const in JavaScript. When should I use each?",
        users: "JaneSmith",
        created_at: new Date().toISOString(),
    },
    {
        id: 3,
        title: "Why is my API fetch request returning an error?",
        body: "I am fetching data from an API, but I keep getting a 404 error. What could be wrong?",
        users: "CodeMaster",
        created_at: new Date().toISOString(),
    },
];

const Questions = () => {
    const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
    const [loading, setLoading] = useState(false); // Set to false since we're using sample data

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/questions`);
                if (!res.ok) throw new Error("Failed to fetch questions");
                const data = await res.json();
                setQuestions(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };

        // Uncomment this when database is ready
        // fetchQuestions();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading questions...</p>;

    return (
        <div className="space-y-6 p-4">
            {questions.length > 0 ? (
                questions.map((q) => (
                    <div key={q.id} className="border-b pb-4">
                        <h3 className="text-lg font-semibold">{q.title}</h3>
                        <p className="text-gray-600">{q.body}</p>
                        <p className="text-sm text-gray-400">
                            Asked by {q.users} • {new Date(q.created_at).toLocaleString()}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No questions found.</p>
            )}
        </div>
    );
};

export default Questions;
