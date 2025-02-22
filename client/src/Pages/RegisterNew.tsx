import BorderlessForm from "../components/BorderlessForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignInWithButton from "../components/SignInWithButton";

function Register() {
  return (
    <div className="bg-white dark:bg-linear-to-b dark:from-gray-800 from-25% dark:to-green-950 dark:text-white">
      <Header />
      <div className="h-dvh flex flex-col justify-center">
        <div className="my-8 mx-auto mb-20">
          <h1 className=" text-xlsm:text-xl md:text-3xl font-playwrite my-2">
            Create Your [<span className="text-green-400">Forum</span>]
            Account Now
          </h1>
          <p className="text-center text-gray-400">
            to get 1% smarter every day.
          </p>
        </div>
        <div className="grid grid-cols-2 divide-x-4 divide-green-400">
          <div className="col-span-1">
          <h1 className="text-white mx-auto text-3xl font-playwrite text-center">
              Register
            </h1>
            <BorderlessForm />
          </div>
          <div className="col-span-1 flex flex-col">
            <h1 className="text-white mx-auto text-3xl font-playwrite text-center">
              Login With
            </h1>
            <div className="justify-center my-auto">
              <SignInWithButton imgURL="https://img.icons8.com/?size=100&id=17950&format=png&color=FFFFFF" text="Login with Google"/>
              <SignInWithButton imgURL="https://img.icons8.com/?size=100&id=106567&format=png&color=FFFFFF" text="Login with GitHub"/>
              <SignInWithButton imgURL="https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF" text="Login with Apple"/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
