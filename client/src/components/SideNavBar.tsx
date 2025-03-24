import FeedLogos from "./FeedLogos";

function SideNavBar(){
    return(
        <div className="fixed z-0 left-0 h-screen w-20 flex flex-col border-e-2 border-gray-500 bg-gray-950 text-white shadow-lg divide-solid"> 
            <div className="my-auto mx-auto justify-center ">
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