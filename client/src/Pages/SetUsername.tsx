import { useState } from "react";
import BorderlessInput from "../components/BorderlessInput";

function SetUsername() {

    const [username, setUsername] = useState("");

    function handleChange(event: any) {
        const val = event.target.value;
        setUsername(val);
        console.log(username);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get("email");
        const name = urlParams.get("name");

        
        

        const res = await fetch(import.meta.env.VITE_API_URL + "/api/auth/set-username", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, name }),
        });

        const data = await res.json();
        if(data.success) {
            window.location.href = "/feed";
        } else {
            alert(data.message);
        }
    }

  return (
    <div className="h-dvh dark:bg-gray-900 dark:text-white flex flex-col justify-center">
      <div className="w-1/4 mx-auto">
        <form onSubmit={handleSubmit} action="">
            <BorderlessInput type="text" label="Username" onChange={handleChange}/>
            <button className="outline-1 outline-fuchsia-500 w-full hover:cursor-pointer rounded" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SetUsername;
