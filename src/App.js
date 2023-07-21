import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Specialties from "./pages/Specialties";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/doctores" Component={Doctors} />
        <Route path="/especialidades" Component={Specialties} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
