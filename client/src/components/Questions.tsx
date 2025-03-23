import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaCommentDots, FaShareAlt } from "react-icons/fa";

interface Question {
  id: number;
  title: string;
  body: string;
  users: string;
  created_at: string;
  avatar: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  text: string;
  user: string;
  created_at: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    title: "How does useEffect work in React?",
    body: "I am trying to understand how useEffect works. When does it run, and how can I control it?",
    users: "JohnDoe",
    created_at: new Date().toISOString(),
    avatar: "https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=",
    comments: [
      {
        id: 1,
        text: "useEffect runs after the render, and you can control it with dependency arrays.",
        user: "ReactExpert",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        text: "It also cleans up when you return a function inside it, which runs when the component unmounts or when the dependencies change.",
        user: "CodeMaster",
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        text: "Don't forget to include your dependencies in the array to avoid unnecessary re-renders.",
        user: "DevGuru",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: "What is the difference between var, let, and const?",
    body: "I keep getting confused between var, let, and const in JavaScript. When should I use each?",
    users: "JaneSmith",
    created_at: new Date().toISOString(),
    avatar: "https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=",
    comments: [
      {
        id: 1,
        text: "Use `var` for older code, but avoid it for modern development. Stick to `let` and `const`.",
        user: "JSExpert",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        text: "`let` is for variables that will change, and `const` is for constants that won't change.",
        user: "SyntaxPro",
        created_at: new Date().toISOString(),
      },
    ],
  },
];

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [openComments, setOpenComments] = useState<number | null>(null); 

  const toggleComments = (questionId: number) => {
    if (openComments === questionId) {
      setOpenComments(null);
    } else {
      setOpenComments(questionId);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {questions.length > 0 ? (
        questions.map((q) => (
          <div key={q.id} className="border-b pb-4 flex space-x-4 items-start">
            <img
              src={q.avatar}
              alt={`${q.users}'s avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div>
                <h3 className="text-lg font-semibold">{q.title}</h3>
                <p className="text-gray-600">{q.body}</p>
                <p className="text-sm text-gray-400">
                  Asked by {q.users} • {new Date(q.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-2">
                <button className="flex items-center text-green-500 hover:text-green-600">
                  <FaArrowUp className="mr-1" />
                  <span>Upvote</span>
                </button>

                <button className="flex items-center text-red-500 hover:text-red-600">
                  <FaArrowDown className="mr-1" />
                  <span>Downvote</span>
                </button>

                <button
                  className="flex items-center text-gray-600 hover:text-gray-800"
                  onClick={() => toggleComments(q.id)}
                >
                  <FaCommentDots className="mr-1" />
                  <span>Comment</span>
                </button>

                <button className="flex items-center text-gray-600 hover:text-gray-800">
                  <FaShareAlt className="mr-1" />
                  <span>Share</span>
                </button>
              </div>
              {openComments === q.id && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-md font-semibold">Comments</h4>
                  {q.comments && q.comments.length > 0 ? (
                    q.comments.map((comment) => (
                      <div key={comment.id} className="ml-6 border-l-2 pl-4">
                        <p className="text-gray-800">{comment.text}</p>
                        <p className="text-sm text-gray-400">
                          - {comment.user}, {new Date(comment.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                  )}

                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="w-full p-2 border rounded"
                    />
                    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                      Post Comment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No questions found.</p>
      )}
    </div>
  );
};

export default Questions;
