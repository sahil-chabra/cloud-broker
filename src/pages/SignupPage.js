import React, { useEffect } from "react";
import Form from "../components/Form/Form";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

function SignUp({ userType }) {
  const { user, showAlert } = useAppContext();
  // console.log(userType);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !showAlert) {
      navigate("/");
    }
  }, [user, showAlert, navigate]);

  return <Form userType={userType} />;
}

export default SignUp;
