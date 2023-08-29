import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Register, UserForm } from "./pages/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
