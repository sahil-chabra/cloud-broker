import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useAppContext } from "../context/appContext";
// import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    return <Redirect to="/signup" />;
  }
  return children;
};
export default ProtectedRoute;
