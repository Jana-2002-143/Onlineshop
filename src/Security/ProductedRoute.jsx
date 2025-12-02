import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  };

  if (!token || isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to="/Login" replace />;
  }

  return children;
}

export default ProtectedRoute;
