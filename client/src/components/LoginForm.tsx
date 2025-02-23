import { useState } from "react";
import BorderlessInput from "./BorderlessInput";
import { useNavigate } from "react-router-dom";

function BorderlessFormLog() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({username: "", password: ""})

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(prevValue => {
      return {...prevValue, [name]:value}
    });
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    
    const response = await fetch(API_URL + "/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if(response.ok) {
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full grid grid-cols-2 gap-x-4 mx-auto">
      <BorderlessInput onChange={handleChange} colSpan="2" name="username" type="text" label="Username/Email"/>
      <BorderlessInput onChange={handleChange} colSpan="2" name="password" type="password" label="Password"/> 
      <button className="outline outline-green-400 hover:bg-green-400 hover:cursor-pointer hover:text-black hover:font-bold transition-all delay-100 col-span-2 mt-4 h-8 rounded-md" type="submit"> Submit </button>
    </form>
  );
}
export default BorderlessFormLog;