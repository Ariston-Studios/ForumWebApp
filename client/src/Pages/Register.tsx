import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ButtonWithImage from "../components/ButtonWithImage";

function Register() {
  return (
    <div className="bg-white dark:bg-linear-to-b dark:from-gray-950 from-25% dark:to-green-950 dark:text-white">
      <Header />
      <div className="h-dvh flex flex-col justify-center">
        <div className="mx-auto mb-20">
          <h1 className=" text-xl sm:text-2xl md:text-4xl font-mono my-2">
            Create Your [<span className="text-green-600">Forum</span>]
            Account Now
          </h1>
          <p className="text-center text-gray-400">
            to get 1% smarter every day.
          </p>
        </div>
        <div className="grid grid-cols-2 divide-x-4 divide-green-400">
          <div className="col-span-1">
            {/* <h1 className="text-white mx-auto text-2xl font-playwrite text-center">
              Register
            </h1> */}
            <RegisterForm />
          </div>
          <div className="col-span-1 flex flex-col">
            {/* <h1 className="text-white mx-auto text-2xl font-playwrite text-center">
              Using
            </h1> */}
            <div className="justify-center my-auto">
              <ButtonWithImage circular={false} pathURL="/api/auth/google" imgURL="https://img.icons8.com/?size=100&id=17950&format=png&color=FFFFFF" text="Login with Google"/>
              <ButtonWithImage circular={false} pathURL="/api/auth/github" imgURL="https://img.icons8.com/?size=100&id=106567&format=png&color=FFFFFF" text="Login with GitHub"/>
              <ButtonWithImage circular={false} pathURL="/api/auth/discord" imgURL="https://img.icons8.com/?size=100&id=30888&format=png&color=FFFFFF" text="Login with Discord"/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
