import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";
import Calendar from "../components/Calendar";
import { useUser } from "@/context/UserContext";

function Question() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(""); // State to store validation errors
  const {user} = useUser();
  const navigate = useNavigate();

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault();
    setError(""); // Clear previous errors
 
    // Validation
    if (title.trim().length < 10) {
      setError("Title must be at least 10 characters long.");
      return;
    }
    if (details.trim().length < 20) {
      setError("Details must be at least 20 characters long.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000"; // Fallback API URL
      const res = await fetch(`${apiUrl}/api/questions/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body: details, username:  user?.username}),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to post question. Please try again.");
      }
      setTitle("");
      setDetails("");
      navigate("/feed");
    } catch (error) {
      console.error("Error posting question:", error);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen flex">
      <SideNavBar />
      <div className="flex-1 p-10">
        <Header />

        <div className="grid grid-cols-4 mx-40 mt-40 gap-10">

          <div className="col-span-3 bg-gray-950 outline outline-gray-800 rounded-xl p-8 shadow-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <label className="block text-lg font-medium mb-1">Title</label>
                <p className="text-sm text-gray-400 mb-2">
                  Be specific and imagine you're asking a question to another person.
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 outline outline-gray-600 rounded-lg text-white bg-gray-950 my-1 shadow-inset-1"
                  placeholder="Enter your question title"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">What are the details of your problem?</label>
                <p className="text-sm text-gray-400 mb-2">
                  Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                </p>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-3 outline outline-gray-600 rounded-lg focus:none text-white bg-gray-950 my-1 shadow-inset-1"
                  rows={5}
                  placeholder="Provide more details about your question"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-1/5 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition cursor-pointer"
              >
                Post Question
              </button>
            </form>
          </div>          
          <div className="col-span-1 h-100 outline outline-gray-800 rounded-xl mx-auto shadow-1 p-10">
            <Calendar />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Question;
