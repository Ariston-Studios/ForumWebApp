function Loginlogos(props: any) {
  function handleLogin() {
    window.location.href = import.meta.env.VITE_API_URL + `${props.pathURL}`;
  }  
  
  return (
      <button onClick={handleLogin} className="my-5 flex flex-col items-center cursor-pointer border-1 rounded-full border-green-400 hover:bg-green-400">
        <div className="flex justify-center items-center p-2">
          <img height={24} width={24} src={props.imgURL} alt="Logo" />
        </div>
        <p className="text-lg">{props.text}</p>
      </button>
    );
  }
  
  export default Loginlogos;
  