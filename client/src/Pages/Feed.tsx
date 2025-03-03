import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetUsernameModal from "../components/SetUsernameModal";
import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";

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
        }// else {
        //   navigate("/register");
        // }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="bg-white dark:bg-linear-to-b dark:bg-gray-900 dark:text-white shadow-lg border-1 border-white">
      <Header />
      <SideNavBar />
      <div className="h-dvh -z-10"></div>
      {isModalOpen && user && <SetUsernameModal user={user} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Feed;