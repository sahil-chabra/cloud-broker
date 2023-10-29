import React from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignupPage";
import UserForm from "./pages/UserFormPage";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import ComparisionPage from "./pages/ComparisonPage";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route
          path="/form"
          exact
          render={() => (
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/pricing"
          exact
          render={() => (
            <ProtectedRoute>
              <ComparisionPage />
            </ProtectedRoute>
          )}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
