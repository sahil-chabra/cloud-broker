import React from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignupPage";
import UserForm from "./pages/UserFormPage";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import ComparisionPage from "./pages/ComparisonPage";
import SharedLayout from "./pages/UserDashBoard/SharedLayout";
import ServiceRequirements from "./pages/UserDashBoard/ServiceRequirements";
import UserFormPage from "./pages/UserFormPage";

function App() {
  return (
    <Router>
      <GlobalStyle />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ComparisionPage />} />
          <Route path="/filter" element={<ServiceRequirements />} />
        </Route>
        <Route
          path="/cspform"
          element={
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp userType="client" />} />
        <Route
          path="/signinProvider"
          element={<SignUp userType="provider" />}
        />
        <Route path="/registerProvider" element={<UserFormPage />} />
        <Route path="/landing" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
