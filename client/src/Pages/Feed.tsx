import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";
function Feed(){
    return(
        <div className="bg-white dark:bg-linear-to-b dark:from-gray-800 from-25% dark:to-green-950 dark:text-white shadow-lg border-1 border-white">
      <Header />
      <div className="my-10">
      <SideNavBar/>
      </div>
        </div>
    )
}
export default Feed;