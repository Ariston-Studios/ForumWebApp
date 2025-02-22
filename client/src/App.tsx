import { Routes, Route } from "react-router-dom";
import Register from "./Pages/RegisterNew.tsx";
import Login from "./Pages/Login.tsx";
import SetUsername from "./Pages/SetUsername.tsx";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/set-username" element={<SetUsername />} />
    </Routes>
  );
}

export default App;
