import { Navigate } from "react-router-dom";

function ProtectedFuncionarioRoute({ children }) {
  const token = localStorage.getItem("tokenFuncionario");

  if (!token) {
    return <Navigate to="/loginfuncionario" replace />;
  }

  return children;
}

export default ProtectedFuncionarioRoute;
