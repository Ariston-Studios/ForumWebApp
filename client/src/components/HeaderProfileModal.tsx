import { useNavigate } from "react-router-dom";

export default function HeaderProfileModal() {

    const navigate = useNavigate();

    async function handleLogOutClick() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if(res.ok) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.error)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="absolute -left-52 top-20 max-h-100 w-70 p-5 bg-[#060A15] outline outline-gray-800 rounded-2xl shadow-2xl transition-all ease-in-out duration-100">
      <div className="flex items-center gap-5 mb-5 rounded-lg p-5 outline">
        <img className="rounded-full" src="https://picsum.photos/50" alt="" />
        <span className="font-bold">DizValheim</span>
      </div>
      <button onClick={handleLogOutClick} className="flex items-center w-full gap-2 p-2 rounded-lg hover:bg-[#151821] cursor-pointer">
        <img
          src="https://img.icons8.com/?size=30&id=Q1xkcFuVON39&format=png&color=FA003F"
          alt=""
        />
        <span className="font-bold">Logout</span>
      </button>
    </div>
  );
}
