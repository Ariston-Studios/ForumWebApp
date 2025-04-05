import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import HeaderProfileModal from "./HeaderProfileModal";
import { useUser } from "@/context/UserContext";


// const sampleUser : User = {id: 1, username: 'StylishName', name: 'John Doe', email_id: 'johndoe@email.com'};

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { setUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  function handleLoginClick() {
    if (location.pathname !== "/login") {
      navigate("/login");
    }
  }

  function handleRegClick() {
    if (location.pathname !== "/register") {
      navigate("/register");
    }
  }

  function toggleProfileModal() {
    setProfileModalVisible(!profileModalVisible);
  }

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check-session`, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkLoggedIn();
  }, [navigate]);

  return (
    <nav
      className={`fixed z-10 top-0 left-0 right-0 shadow-lg ${
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        "border-b-2 border-gray-500 "
      } bg-gray-950 divide-solid divide-green-400 text-white`}
    >
      <div className="flex justify-between items-center mx-auto p-4 pl-20 pr-10">
        <Logo />
        <div
          className="hidden md:flex md:w-1/3 mx-auto justify-center"
          id="navbar-default"
        >
          <div
            className={`${
              location.pathname === "/login" ||
              location.pathname === "/register"
                ? "hidden"
                : ""
            } ml-15 flex items-center rounded-lg p-1 border-2 bg-gray-900 border-gray-800 focus-within:border-green-400`}
          >
            <img
              className="ps-1 pe-1"
              height={30}
              width={30}
              src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF"
              alt="search"
            />
            <input
              className="p-1 w-150 focus:outline-none"
              type="text"
              placeholder="Search [FORUM]"
            />
          </div>
        </div>
        {isLoggedIn ? (
          <div className="relative">
            <img onClick={toggleProfileModal} height={50} width={50} className="peer rounded-full cursor-pointer" src="https://picsum.photos/50" alt="Profile Picture" />
            { profileModalVisible && <HeaderProfileModal /> }
          </div>
        ) : (
          <div className="hidden md:block font-bold">
            <button
              onClick={handleLoginClick}
              className={`mx-2 cursor-pointer ${
                location.pathname === "/login"
                  ? "text-green-600 p-1 border-b-4 border-b-green-600"
                  : "p-1 hover:border-b-4 hover:border-b-green-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={handleRegClick}
              className={`mx-2 cursor-pointer ${
                location.pathname === "/register"
                  ? "text-green-600 p-1 border-b-4 border-b-green-600"
                  : "p-1 hover:border-b-4 hover:border-b-green-600"
              }`}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
