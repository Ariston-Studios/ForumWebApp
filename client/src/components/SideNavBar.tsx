import FeedLogos from "./FeedLogos";

function SideNavBar(){
    return(
        <div className="fixed top-15.5 left-0 h-screen w-20 flex
                        bg-gray-800 text-white shadow-lg divide-solid"> 
         <div className=" ml-auto my-30 mx-auto relative items-center justify-center ">
         <FeedLogos imgURL="https://img.icons8.com/?size=100&id=3AvsrruafqJF&format=png&color=FFFFFF" text="HOME"/>
         <FeedLogos imgURL="https://img.icons8.com/?size=100&id=23378&format=png&color=FFFFFF" text="PROFILE" />
         <FeedLogos imgURL="https://img.icons8.com/?size=100&id=16148&format=png&color=FFFFFF" text="ASK" />
         <FeedLogos imgURL="https://img.icons8.com/?size=100&id=16141&format=png&color=FFFFFF" text="PINNED"/>
         <FeedLogos imgURL="https://img.icons8.com/?size=100&id=YcN5CfB6FSvS&format=png&color=FFFFFF"text="NOTIFICATION" />
         </div>
        </div>
    )
}
export default SideNavBar;