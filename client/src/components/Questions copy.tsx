// src/components/Questions.tsx
import { useEffect, useState } from "react";

interface Question {
    id: number;
    title: string;
    body: string;
    users: string;
    created_at: string;
}

const Questions = () => {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        // Temporary sample data until DB is connected
        const sampleQuestions: Question[] = [
            {
                id: 1,
                title: "How to use React useEffect hook?",
                body: "I am trying to understand the useEffect hook. Can someone explain it with an example?",
                users: "JohnDoe",
                created_at: "30 minutes ago",
            },
            {
                id: 2,
                title: "What is TypeScript and why use it?",
                body: "I have been hearing a lot about TypeScript. What are its benefits over JavaScript?",
                users: "JaneDoe",
                created_at: "1 hour ago",
            },
        ];
        setQuestions(sampleQuestions);
    }, []);

    return (
        <div className="p-5 bg-gray-800 rounded-xl">
            {questions.map((question) => (
                <div key={question.id} className="p-4 mb-4 bg-gray-900 rounded-lg">
                    <div className="flex items-center mb-2">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full mr-2"
                        />
                        <span className="text-gray-300">{question.users} • {question.created_at}</span>
                    </div>
                    <h2 className="text-white text-lg font-bold mb-2">{question.title}</h2>
                    <p className="text-gray-400 mb-3">{question.body}</p>
                    <div className="flex items-center space-x-4 text-gray-400">
                        <button className="hover:text-green-500">⬆️ 12</button>
                        <button className="hover:text-red-500">⬇️ 2</button>
                        <button className="hover:text-blue-400">💬 Open Thread</button>
                        <button className="hover:text-yellow-400">🔗 Share</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Questions;
