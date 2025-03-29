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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="bg-linear-to-b bg-gray-950 text-white shadow-lg border-1 border-white">
      <Header />
      <SideNavBar />
      <div className="h-dvh -z-10 grid grid-cols-4 ml-32 mr-12 mt-20.5 mb-5">
        <div className="col-span-3 bg-gray-900 rounded-xl mt-10 mb-5 ml-10 mr-10">
          <Questions />
        </div>
        <div className=" bg-gray-900 rounded-xl mt-10 mb-5 ml-5 mr-10 flex justify-center">
          <Calendar />
        </div>
      </div>
      {isModalOpen && user && <SetUsernameModal user={user} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Feed;