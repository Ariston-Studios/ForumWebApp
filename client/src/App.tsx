import { Routes, Route } from "react-router-dom";
import Register from "./Pages/RegisterNew.tsx";
import SetUsername from "./Pages/SetUsername.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/set-username" element={<SetUsername />} />
    </Routes>
  );
}

export default App;
