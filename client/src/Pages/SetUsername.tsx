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
    if (data.success) {
      window.location.href = "/feed";
    } else {
      alert(data.message);
    }
  }
}

return (
  <div className="h-dvh bg-white dark:bg-linear-to-b dark:from-gray-950 from-25% dark:to-green-950 dark:text-white  flex flex-col justify-center">
    <div className="w-1/4 mx-auto">
      <h1 className="text-white mx-auto text-2xl mb-10 font-playwrite text-center">
        What do we call ya?
      </h1>
      <form onSubmit={handleSubmit} action="">
        <BorderlessInput type="text" label="Username Set Kar MGH" onChange={handleChange} />
        <button className="outline outline-green-600 hover:bg-green-600 hover:cursor-pointer transition-all delay-100 w-full h-8 mt-1.5 rounded-md" type="submit">Submit</button>
      </form>
    </div>
  </div>
);
}

export default SetUsername;
