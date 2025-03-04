import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SetUsernameModal from "../components/SetUsernameModal";
import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";

function Feed() {

  const [user, setUser] = useState<{ email: string; name: string; username?: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const year = new Date().getFullYear();

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
      <div className="h-dvh -z-10 grid grid-cols-4 ml-32 mr-12 mt-20.5 mb-5">
        <div className="col-span-3 dark:bg-gray-800 rounded-xl mt-10 mb-5 ml-10 mr-10">
          <h1>Something Something</h1>
        </div>
        <div className="col-span-1 dark:bg-gray-800 rounded-xl mt-10 mb-5 ml-5 mr-10">
          <h1>Hello Hunny Bunny</h1>
        </div>
      </div>
      <p className="left-0 bottom-0 right-0 text-center dark:text-white my-5">Copyright &copy; {year}</p>
      {isModalOpen && user && <SetUsernameModal user={user} onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}

export default Feed;