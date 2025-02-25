import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";
function Feed(){
    return(
      <div className="bg-white dark:bg-linear-to-b dark:bg-gray-900 dark:text-white shadow-lg border-1 border-white">
        <Header />
        <SideNavBar/>
        <div className="h-dvh -z-10"></div>
      </div>
    )
}
export default Feed;