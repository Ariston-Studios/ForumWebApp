import React, { useState } from 'react';

function FeedLogos(props: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="my-5 items-center cursor-pointer border-1 rounded-full border-green-400 hover:bg-green-400 hover:rounded-xl transiiton-all hover:delay-80 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center p-2 transition-all">
        <img height={34} width={34} src={props.imgURL} alt="Logo" />
      </div>
      {isHovered && (
        <span className="absolute w-auto p-2 left-20 rounded-md shadow-md text-white bg-gray-900 text-xs font-bold transition-all not-odd:origin-left ">
          {props.text}
        </span>
      )}
    </div>
  );
}

export default FeedLogos;
