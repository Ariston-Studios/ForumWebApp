import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import SetUsername from "./Pages/SetUsername.tsx";
import Feed from "./Pages/Feed.tsx";

import Ask from "./Pages/Question.tsx";
//import SetUsernameModal from "../components/SetUsernameModal.tsx";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/set-username" element={<SetUsername />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/ask" element={<Ask />} />
    </Routes>
  );
}

export default App;
