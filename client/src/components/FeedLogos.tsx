import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FeedLogos(props: any) {
  const [ buttonState, setButtonState ] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    setButtonState(true);
    navigate(`${props.href}`)
  }

  return (
    <div onClick={handleClick} className={`relative my-5 cursor-pointer border-2 rounded-full border-green-400 ${buttonState ? "bg-green-400/30 rounded-xl" : "hover:bg-green-400/30 hover:rounded-xl"} transiiton-all hover:delay-80 `}>
      <div className="peer items-center p-2 select-none">
        <img height={34} width={34} src={props.imgURL} alt="Logo" />
      </div>
      <span className="hidden peer-hover:block p-2 absolute left-20 top-1/5 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all not-odd:origin-left ">
        {props.text}
      </span>
      <div className={`absolute -left-3 top-5 h-1/5 ${buttonState ? "top-1/5 h-1/2" : "peer-hover:top-1/5 peer-hover:h-1/2"} w-1/10 rounded-full bg-green-500 transition-all delay-75`}></div>
    </div>
  );
}

export default FeedLogos;
