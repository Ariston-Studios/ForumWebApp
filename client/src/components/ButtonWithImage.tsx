function ButtonWithImage(props: any) {
    function handleLogin() {
        window.location.href = import.meta.env.VITE_API_URL + `${props.pathURL}`;
      }
      
      return (
        <button onClick={handleLogin} className={`${props.circular ? "items-center rounded-full outline-2 outline-green-400 hover:bg-green-400" : "w-70 h-15 mx-auto rounded-md hover:outline-green-600 outline-2"} my-5 flex flex-col justify-center cursor-pointer`}>
          <div className={`flex ${props.circular ? "flex-col  p-2" : null} justify-center items-center`}>
            <img height={24} width={24} src={props.imgURL} alt="Logo" />
            {!props.circular && <p className="ms-2 text-lg">{props.text}</p>}
          </div>
        </button>
      );
}

export default ButtonWithImage;