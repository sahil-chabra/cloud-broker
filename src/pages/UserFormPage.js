import { useState } from "react";
import UserForm from "../components/UserForm/UserForm";
import { useNavigate } from "react-router-dom";

const UserFormPage = () => {
  const navigate = useNavigate();

  return <UserForm />;
};

export default UserFormPage;
