import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetUsernameModal from "../components/SetUsernameModal";
import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";
import Questions from "../components/Questions";
import Calendar from "../components/Calendar";


function Feed() {

  const [user, setUser] = useState<{ email: string; name: string; username?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-session`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          console.log(data);
          if (data.needsUsername) {
            setIsModalOpen(true);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="min-h-dvh bg-gray-950 text-white border-1 border-white">
      <Header />
      <SideNavBar />
      <div className="grid grid-cols-4 mx-40 mt-40 gap-10">
        <div className="col-span-3 rounded-xl">
          <Questions />
        </div>
        <div className="col-span-1 h-100 outline outline-gray-800 rounded-xl mx-auto shadow-1 p-10 mt-3">
          <Calendar />
        </div>
      </div>
      {isModalOpen && user && <SetUsernameModal user={user} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Feed;