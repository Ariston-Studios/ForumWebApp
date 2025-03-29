import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";
import Calendar from "../components/Calendar";

function Question() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(""); // State to store validation errors
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
      const res = await fetch(`${apiUrl}/api/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, details }),
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
    <div className="bg-gray-900 text-white min-h-screen flex">
      <SideNavBar />
      <div className="flex-1 p-10">
        <Header />

        <div className="grid grid-cols-4 gap-5 mt-30 ml-30">

          <div className="col-span-3 bg-gray-800 rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <label className="block text-lg font-medium">Title</label>
                <p className="text-sm text-gray-400 mb-2">
                  Be specific and imagine you're asking a question to another person.
                </p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg text-white bg-gray-800"
                  placeholder="Enter your question title"
                />
              </div>

              <div>
                <label className="block text-lg font-medium">What are the details of your problem?</label>
                <p className="text-sm text-gray-400 mb-2">
                  Introduce the problem and expand on what you put in the title. Minimum 20 characters.
                </p>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full p-3 border border-gray-600 rounded-lg text-white bg-gray-800"
                  rows={5}
                  placeholder="Provide more details about your question"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-1/5 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
              >
                Post Question
              </button>
            </form>
          </div>          
          <div className="bg-gray-800 rounded-xl flex justify-center items-center p-5">
            <Calendar />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Question;
