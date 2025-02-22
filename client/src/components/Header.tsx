import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLoginClick() {
    if (location.pathname === "/register") {
      navigate("/login");
    }
  }
  
  function handleRegClick() {
    if (location.pathname === "/login") {
      navigate("/register");
    } 
  }  

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 divide-solid divide-green-400 dark:text-white">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="hidden w-full md:block md:w-1/3 mx-auto" id="navbar-default">
            <ul className="font-medium flex flex-col items-center border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse p-4 md:p-0 mt-4 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                <li className="text-xl"><a href="">Home</a></li>
                <li className="text-xl"><a href="">About</a></li>
                <li className="text-xl"><a href="">Services</a></li>
                <div className="border-b-1 flex items-center p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    <input className="p-1 w-15 focus:w-70 delay-20 transition-all focus:outline-none" type="text" placeholder="Search..."/>
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
