import { useState } from "react";
import BorderlessInput from "./BorderlessInput";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function BorderlessForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confPassword: "",
  });

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevValue: any) => {
      return { ...prevValue, [name]: value };
    });

  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    if(formData.password !== formData.confPassword){
      alert("Passwords don't match");
    }

    const response = await fetch(API_URL +"/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if(response.ok) {
      navigate("/login")
      alert(data.info);
    }
    console.log(data);
  }

  return (
    <form className="w-1/2 grid grid-cols-2 gap-x-4 mx-auto" action="" onSubmit={handleSubmit}>
      <BorderlessInput colSpan="2" name="name" type="text" label="Name" onChange={handleChange}/>
      <BorderlessInput
        colSpan="2"
        name="username"
        type="text"
        label="Username"
        onChange={handleChange}
      />
      <BorderlessInput colSpan="2" name="email" type="email" label="Email" onChange={handleChange}/>
      <BorderlessInput
        colSpan="1"
        name="password"
        type="password"
        label="Password"
        onChange={handleChange}
      />
      <BorderlessInput
        colSpan="1"
        name="confPassword"
        type="password"
        label="Confirm Password"
        onChange={handleChange}
      />
      <button
        className="outline outline-green-600 hover:bg-green-600 hover:cursor-pointer transition-all delay-100 col-span-2 mt-4 h-8 rounded-md"
        type="submit"
      >
        
        Submit
      </button>
    </form>
  );
}

export default BorderlessForm;
