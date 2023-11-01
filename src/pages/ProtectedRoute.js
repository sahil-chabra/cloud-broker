import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  console.log(user);
  // const navigate = useNavigate();
  return (
    <>
      {!user && <Navigate to={"/landing"} />}
      {user && children}
    </>
  );
};
export default ProtectedRoute;
