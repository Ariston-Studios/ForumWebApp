function SignInWithButton(props: any) {
  console.log(props);
  

  function handleLogin() {
    // console.log(props.pathURL);
    
    window.location.href = import.meta.env.VITE_API_URL + `${props.pathURL}`;
  }
  
  return (
    <button onClick={handleLogin} className="w-70 h-15 mx-auto my-5 flex flex-col justify-center cursor-pointer outline-2 hover:outline-green-600 rounded-md">
      <div className="flex justify-center items-center">
        <img height={24} width={24} src={props.imgURL} alt="Logo" />
        <p className="ms-2 text-lg">{props.text}</p>
      </div>
    </button>
  );
}

export default SignInWithButton;
