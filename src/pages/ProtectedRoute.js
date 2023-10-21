import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    return <Redirect to="/signup" />;
  }
  return children;
};
export default ProtectedRoute;
