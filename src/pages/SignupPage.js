import React from "react";
import Form from "../components/Form/Form";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useAppContext } from "../context/appContext";

function SignUp() {
  const { user, showAlert } = useAppContext();
  //   useEffect(() => {
  //     if (user) {
  //       console.log("found");
  //       setTimeout(() => {
  //         return <Redirect to="/form" />;
  //       }, 3000);
  //     }
  //   }, [user]);

  return (
    <>
      {user && !showAlert && <Redirect to="/form" />}
      {(!user || showAlert) && <Form />}
    </>
  );
}

export default SignUp;
