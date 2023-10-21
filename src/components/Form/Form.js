import React, { useState, useEffect } from "react";
import {
  FormColumn,
  FormWrapper,
  FormInput,
  FormSection,
  FormRow,
  FormLabel,
  FormInputRow,
  FormMessage,
  FormButton,
  FormTitle,
  FormMemberLink,
  FormMemberButtom,
} from "./FormStyles";
import { Container } from "../../globalStyles";
import validateForm from "./validateForm";
import { useAppContext } from "../../context/appContext";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMember, setIsMember] = useState(false);

  const {
    user,
    registerUser,
    logInUser,
    isLoading,
    displayAlert,
    alertText,
    alertType,
    showAlert,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultError = validateForm({
      name,
      email,
      password,
      confirmPass,
      isMember,
      alertType,
      alertText,
      showAlert,
    });

    if (resultError !== null) {
      displayAlert({
        alertType: "error",
        alertText: resultError,
      });
      return;
    }

    if (isMember) {
      const currentUser = {
        email,
        password,
      };

      logInUser(currentUser);
    } else {
      const currentUser = {
        name,
        email,
        password,
        confirmPass,
      };

      registerUser(currentUser);
    }
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  const messageVariants = {
    hidden: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
  };

  return (
    <FormSection>
      <Container>
        <FormRow>
          <FormColumn small>
            <FormTitle>{isMember ? "Log in" : "Sign Up"}</FormTitle>
            <FormWrapper onSubmit={handleSubmit}>
              {!isMember && (
                <FormInputRow>
                  <FormLabel>Name</FormLabel>
                  <FormInput
                    type="text"
                    placeholder={`Enter your name:`}
                    value={name}
                    onChange={(event) => {
                      event.preventDefault();
                      setName(event.target.value);
                    }}
                  />
                </FormInputRow>
              )}
              <FormInputRow>
                <FormLabel>Name</FormLabel>
                <FormInput
                  type="email"
                  placeholder={`Enter your Email:`}
                  value={email}
                  onChange={(event) => {
                    event.preventDefault();
                    setEmail(event.target.value);
                  }}
                />
              </FormInputRow>
              <FormInputRow>
                <FormLabel>Password</FormLabel>
                <FormInput
                  type="password"
                  placeholder={`Enter your Password:`}
                  value={password}
                  onChange={(event) => {
                    event.preventDefault();
                    setPassword(event.target.value);
                  }}
                />
              </FormInputRow>
              {!isMember && (
                <FormInputRow>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormInput
                    type="password"
                    placeholder={`Reenter your Password:`}
                    value={confirmPass}
                    onChange={(event) => {
                      event.preventDefault();
                      setConfirmPass(event.target.value);
                    }}
                  />
                </FormInputRow>
              )}

              <FormButton type="submit">Signup</FormButton>
              <FormMemberLink>
                {isMember ? "Not a member?" : "Already a member?"}
                <FormMemberButtom
                  type="button"
                  onClick={() => {
                    setIsMember((prev) => !prev);
                  }}
                >
                  {isMember ? "Sign up" : "Log in"}
                </FormMemberButtom>
              </FormMemberLink>
            </FormWrapper>
            {showAlert && (
              <FormMessage
                variants={messageVariants}
                initial="hidden"
                animate="animate"
                alertType
              >
                {alertText}
              </FormMessage>
            )}
          </FormColumn>
        </FormRow>
      </Container>
    </FormSection>
  );
};

export default Form;
