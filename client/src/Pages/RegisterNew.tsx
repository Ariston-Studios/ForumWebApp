import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignInWithButton from "../components/SignInWithButton";

function Register() {
  return (
    <div className="bg-white dark:bg-linear-to-b dark:from-gray-900 from-25% dark:to-fuchsia-950 dark:text-white">
      <Header />
      <div className="h-dvh flex flex-col justify-center">
        <div className="mx-auto mb-20">
          <h1 className=" text-xl sm:text-2xl md:text-4xl font-mono my-2">
            Create Your [<span className="text-fuchsia-600">Forum</span>]
            Account Now
          </h1>
          <p className="text-center text-gray-400">
            to get 1% smarter every day.
          </p>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1">
          <h1 className="text-white mx-auto text-3xl font-playwrite text-center">
              Register
            </h1>
            <RegisterForm />
          </div>
          <div className="absolute left-1/2 rotate-12 bg-fuchsia-400 h-90 w-1 rounded-xl"></div>
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
