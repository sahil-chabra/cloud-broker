import React from "react";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

//Pages
import Home from "./pages/Home";
import SignUp from "./pages/SignupPage";
import Pricing from "./pages/PricingPage";
import UserForm from "./pages/UserForm";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/pricing" exact component={Pricing} />
        <Route
          path="/form"
          exact
          render={() => (
            <ProtectedRoute>
              <UserForm />
            </ProtectedRoute>
          )}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
