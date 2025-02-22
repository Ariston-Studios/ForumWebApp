import BorderlessInput from "./BorderlessInput";

function BorderlessFormLog() {

  return (
    <form className="w-full grid grid-cols-2 gap-x-4 mx-auto" action="">
      <BorderlessInput colSpan="2" name="username/Email" type="text" label="Username/Email"/>
      <BorderlessInput colSpan="2" name="password" type="password" label="Password"/>
      <BorderlessInput colSpan="2" name="conf-password" type="password" label="Confirm Password"/>
      <button className="outline outline-fuchsia-600 hover:bg-fuchsia-600 hover:cursor-pointer transition-all delay-100 col-span-2 mt-4 h-8 rounded-md" type="submit"> Submit </button>
    </form>
  );
}
export default BorderlessFormLog;