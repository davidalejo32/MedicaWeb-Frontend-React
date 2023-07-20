import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/doctores" Component={Doctors} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
