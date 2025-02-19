// import { useState } from "react";
import BorderlessInput from "./BorderlessInput";

function BorderlessForm() {

  return (
    <form className="w-3/4 grid grid-cols-2 gap-x-4 mx-auto" action="">
      <BorderlessInput colSpan="2" name="name" type="text" label="Name"/>
      <BorderlessInput colSpan="2" name="username" type="text" label="Username"/>
      <BorderlessInput colSpan="2" name="email" type="email" label="Email"/>
      <BorderlessInput colSpan="1" name="password" type="password" label="Password"/>
      <BorderlessInput colSpan="1" name="conf-password" type="password" label="Confirm Password"/>
      <button className="outline outline-fuchsia-600 hover:bg-fuchsia-600 hover:cursor-pointer transition-all delay-100 col-span-2 mt-4 h-8 rounded-md" type="submit"> Submit </button>
    </form>
  );
}

export default BorderlessForm;
