import { Routes, Route } from "react-router-dom";
import Register from "./Pages/RegisterNew.tsx";
import Login from "./Pages/Login.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
