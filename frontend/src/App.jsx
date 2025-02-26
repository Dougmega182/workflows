import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";           // ✅ Home page
import Success from "./pages/Success.jsx";     // ✅ Success page
import SignInForm from "./components/SignInForm.jsx";  // ✅ Sign-in form
import SignOutForm from "./components/SignOutForm.jsx"; // ✅ Sign-out form

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signout" element={<SignOutForm />} />
      </Routes>
    </Router>
  );
}
