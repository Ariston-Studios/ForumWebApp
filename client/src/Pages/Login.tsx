import BorderlessFormLog from "../components/LoginForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ButtonWithImage from "../components/ButtonWithImage";

function Login() {
  return (
    <div className="bg-linear-to-b from-gray-950 from-25% to-green-950 text-white shadow-lg">
      <Header />
      <div className="h-dvh flex flex-col justify-center">
        <div className="w-1/4 mx-auto">
          <h1 className="text-center font-open-sans font-bold text-3xl">Login</h1>
          <BorderlessFormLog />
          <div className="flex justify-around my-5">
            <ButtonWithImage circular={true} pathURL="/api/auth/google" imgURL="https://img.icons8.com/?size=100&id=17950&format=png&color=FFFFFF" />
            <ButtonWithImage circular={true} pathURL="/api/auth/github" imgURL="https://img.icons8.com/?size=100&id=106567&format=png&color=FFFFFF" />
            <ButtonWithImage circular={true} pathURL="/api/auth/discord" imgURL="https://img.icons8.com/?size=100&id=30888&format=png&color=FFFFFF" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
