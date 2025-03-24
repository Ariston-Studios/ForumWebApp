import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import SetUsername from "./Pages/SetUsername.tsx";
import Feed from "./Pages/Feed.tsx";
import { ThemeProvider } from "@/components/theme-provider"
//import SetUsernameModal from "../components/SetUsernameModal.tsx";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-username" element={<SetUsername />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
