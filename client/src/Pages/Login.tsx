import BorderlessFormLog from "../components/LoginForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loginlogos from "../components/Loginlogo";

function Login() {
  return (
    <div className="bg-white dark:bg-linear-to-b dark:from-gray-800 from-25% dark:to-green-950 dark:text-white shadow-lg my-10">
      <Header />
      <div className="h-dvh flex flex-col justify-center">
        <h1 className="text-center font-open-sans font-bold text-3xl">Login</h1>
        <div className="w-1/4 mx-auto">
          <BorderlessFormLog />
          <div className="flex justify-around my-5">
          <Loginlogos imgURL="https://img.icons8.com/?size=100&id=17950&format=png&color=FFFFFF" />
          <Loginlogos imgURL="https://img.icons8.com/?size=100&id=106567&format=png&color=FFFFFF" />
          <Loginlogos imgURL="https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF" />
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
