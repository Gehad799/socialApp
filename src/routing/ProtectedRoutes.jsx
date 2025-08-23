import { Navigate } from "react-router";

const ProtectedRoutes = ({children}) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
