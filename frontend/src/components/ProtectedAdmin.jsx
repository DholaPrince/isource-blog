import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const adminPassword = localStorage.getItem("adminPassword");

  if (!adminPassword) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedAdmin;