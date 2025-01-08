import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SigninSignup from "./pages/Signin_Signup/Signinsignup.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*ROOT is must */}
        <Route path="/" element={<Navigate to="/Signin_Signup" />} />
        <Route path="/Signin_Signup" element={<SigninSignup/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;