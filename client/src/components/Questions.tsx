import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaCommentDots,
  FaShareAlt,
} from "react-icons/fa";
import Pagination from "./Pagination";

const QUESTIONS_PER_PAGE = 5;

const defaultAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEFJzVsJgxmsJF_5fz29aDzE9NVB2n5eJxUQ&s";

interface Question {
  id: number;
  title: string;
  body: string;
  username: string;
  created_at: string;
  avatar: string;
  votes: number;
  comments?: Comment[];
}

interface Comment {
  id: number;
  body: string;
  username: string;
  created_at: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    title: "How does useEffect work in React?",
    body: "I am trying to understand how useEffect works. When does it run, and how can I control it?",
    username: "JohnDoe",
    created_at: new Date().toISOString(),
    avatar:
      "https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=",
      votes: 10,
      comments: [
      {
        id: 1,
        body: "useEffect runs after the render, and you can control it with dependency arrays.",
        username: "ReactExpert",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        body: "It also cleans up when you return a function inside it, which runs when the component unmounts or when the dependencies change.",
        username: "CodeMaster",
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        body: "Don't forget to include your dependencies in the array to avoid unnecessary re-renders.",
        username: "DevGuru",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: "What is the difference between var, let, and const?",
    body: "I keep getting confused between var, let, and const in JavaScript. When should I use each?",
    username: "JaneSmith",
    created_at: new Date().toISOString(),
    avatar:
      "https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=",
    votes: 10,
      comments: [
      {
        id: 1,
        body: "Use `var` for older code, but avoid it for modern development. Stick to `let` and `const`.",
        username: "JSExpert",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        body: "`let` is for variables that will change, and `const` is for constants that won't change.",
        username: "SyntaxPro",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 3,
    title: "What is the difference between var, let, and const?",
    body: "I keep getting confused between var, let, and const in JavaScript. When should I use each?",
    username: "JaneSmith",
    created_at: new Date().toISOString(),
    avatar:
      "https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=",
    votes: 10,
      comments: [
      {
        id: 1,
        body: "Use `var` for older code, but avoid it for modern development. Stick to `let` and `const`.",
        username: "JSExpert",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        body: "`let` is for variables that will change, and `const` is for constants that won't change.",
        username: "SyntaxPro",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    id: 4,
    title: "What is the difference between var, let, and const?",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, inventore. Ipsa atque ipsum ea voluptatibus, dignissimos magni blanditiis odio. Asperiores eius perferendis ea accusamus perspiciatis sapiente atque a dolorem sit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt unde totam libero! Quisquam quaerat ipsum vero fuga quam, aperiam a est recusandae exercitationem nulla assumenda, non nostrum corrupti! Unde? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt unde totam libero! Quisquam quaerat ipsum vero fuga quam, aperiam a est recusandae exercitationem nulla assumenda, non nostrum corrupti! Unde?",
    username: "JaneSmith",
    created_at: new Date().toISOString(),
    avatar:
      "https://media.istockphoto.com/id/486869012/photo/goat-looks-at-us.jpg?s=612x612&w=0&k=20&c=yeu3XUkLR2-mO2zwDGNaVL5o0DITA-deNXSKNaCX6bA=",
    votes: 10,
      comments: [
      {
        id: 1,
        body: "Use `var` for older code, but avoid it for modern development. Stick to `let` and `const`.",
        username: "JSExpert",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        body: "`let` is for variables that will change, and `const` is for constants that won't change.",
        username: "SyntaxPro",
        created_at: new Date().toISOString(),
      },
    ],
  },
];

const Questions = () => {
  const [totalQuestions, setTotalQuestions] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/feed?limit=${QUESTIONS_PER_PAGE}&page=${currentPage}&sort=${'newest'}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setQuestions(data.questions);
            setTotalQuestions(data.totalQuestions);
          }
        }
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    }

    fetchQuestions();
  }, [currentPage]);

  async function fetchComments(questionId: number) {
    if (comments[questionId]) {
      setOpenComments(openComments === questionId ? null : questionId);
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/answers/${questionId}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => ({ ...prev, [questionId]: data }));
      }
    } catch (error) {
      console.error("Error fetching comments: ", error);
    }
    setOpenComments(questionId);
  }

  async function vote(questionId: number, voteValue: number) {
    const voteType = (voteValue > 0) ? "upvote" : "downvote";
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, votes: q.votes + voteValue } : q
      )
    );
  
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}/vote`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: voteType }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        throw new Error("Vote failed");
      }
    } catch (error) {
      console.error("Error voting:", error);
  
      // Revert state if API call fails
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, votes: q.votes - voteValue } : q
        )
      );
    }
  }

  return (
    <div className="space-y-6 p-4">
      {questions.map((q) => (
        <div key={q.id} className="bg-[#030715] rounded-2xl pb-4 flex space-x-4 items-start outline outline-gray-800 p-5 shadow-1">
          <img
            src={q.avatar || defaultAvatar}
            alt={`${q.username}'s avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{q.title}</h3>
            <p className="text-gray-300 my-1">{q.body}</p>
            <p className="text-sm text-gray-400 mt-2">
              Asked by {q.username} • {new Date(q.created_at).toLocaleString()}
            </p>

            <div className="flex items-center space-x-4 my-1">
              <button className="flex items-center text-green-500 hover:text-green-600 cursor-pointer" onClick={() => vote(q.id, 1)}>
                <FaArrowUp className="mr-1" />
                <span>Upvote</span>
              </button>
              
              <span className="text-gray-700">•</span>
              <span>{q.votes}</span>
              <span className="text-gray-700">•</span>

              <button className="flex items-center text-red-500 hover:text-red-600 cursor-pointer"  onClick={() => vote(q.id, -1)}>
                <FaArrowDown className="mr-1" />
                <span>Downvote</span>
              </button>

              <span className="text-gray-700">•</span>

              <button
                className="flex items-center text-gray-50 hover:text-gray-400 cursor-pointer"
                onClick={() => fetchComments(q.id)}
              >
                <FaCommentDots className="mr-1" />
                <span>Comment</span>
              </button>

              <span className="text-gray-700">•</span>

              <button className="flex items-center text-gray-50 hover:text-gray-400 cursor-pointer">
                <FaShareAlt className="mr-1" />
                <span>Share</span>
              </button>
            </div>

            

            {openComments === q.id && (
              <div className="mt-4 space-y-2">
                <h4 className="text-md font-semibold">Comments</h4>
                {comments[q.id] && comments[q.id].length > 0 ? (
                  comments[q.id].map((comment) => (
                    <div key={comment.id} className="ml-6 border-l-2 pl-4">
                      <p className="text-gray-50">{comment.body}</p>
                      <p className="text-sm text-gray-400">
                        - {comment.username}, {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No comments yet. Be the first to comment!
                  </p>
                )}

                <div className="mt-2 flex ">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full p-2 outline outline-e-0  focus:none rounded rounded-e-none "
                  />
                  <button className="px-2 mr-1 py-2 outline text-white rounded rounded-s-none cursor-pointer">
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Questions;
