import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <nav className={`fixed z-10 top-0 left-0 right-0 shadow-lg ${(location.pathname !== "/login" && location.pathname !== "/register") && "border-b-2 border-gray-500 "} bg-gray-950 divide-solid divide-green-400 text-white`}>
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="hidden w-full md:flex md:w-1/3 mx-auto justify-center" id="navbar-default">
            <ul className="font-medium flex flex-col items-center border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse p-4 md:p-0 mt-4 md:mt-0 md:border-0 border-gray-700">
            <div className="flex items-center p-1 border-3 rounded-full bg-gray-800 border-gray-600 focus-within:border-green-400 transition-all">
                    <img className="ps-1 pe-1" height={30} width={30} src="https://img.icons8.com/?size=100&id=132&format=png&color=FFFFFF" alt="search" />
                    <input className="p-1 w-15 focus:w-100 delay-20 transition-all focus:outline-none" type="text" placeholder="Search [FORUM]"/>
                </div>
            </ul>
        </div>
        <div className="hidden md:block font-bold">
            <button onClick={handleLoginClick} className={`mx-2 cursor-pointer ${location.pathname === "/login" ? "text-green-600 p-1 border-b-4 border-b-green-600" : "p-1 hover:border-b-4 hover:border-b-green-600"}`}>Login</button>
            <button onClick={handleRegClick} className={`mx-2 cursor-pointer ${location.pathname === "/register" ? "text-green-600 p-1 border-b-4 border-b-green-600" : "p-1 hover:border-b-4 hover:border-b-green-600"}`}>Register</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
