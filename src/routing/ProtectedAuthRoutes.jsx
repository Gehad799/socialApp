import { Navigate } from "react-router";

const ProtectedAuthRoutes = ({children}) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedAuthRoutes;
