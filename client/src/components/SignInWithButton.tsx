function SignInWithButton(props: any) {
  return (
    <div className="w-70 h-15 mx-auto my-5 flex flex-row justify-center items-center cursor-pointer outline-2 hover:outline-fuchsia-600 rounded-md">
      <span>
        <img height={24} width={24} src={props.imgURL} alt="Logo" />
      </span>
      <p className="ms-2 text-lg">{props.text}</p>
    </div>
  );
}

export default SignInWithButton;
