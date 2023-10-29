import { useState } from "react";
import UserForm from "../components/UserForm/UserForm";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const UserFormPage = () => {
  const [showPricing, setShowPricing] = useState(false);

  return (
    <>
      {!showPricing && <UserForm setShowPricing={setShowPricing} />}
      {showPricing && <Redirect to="/pricing" />}
    </>
  );
};

export default UserFormPage;
