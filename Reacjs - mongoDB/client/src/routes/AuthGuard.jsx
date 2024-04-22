import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrenToken, selectCurrentUser } from "../slices/auth.slice";

const AuthGuard = ({ allowedRoles, children }) => {

  const token = useSelector(selectCurrenToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

if(token && (location.pathname ==="login")) return <Navigate to='/'/>
if (!token) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}
  // return user ? <Outlet /> || { children } : <Navigate to="/404" replace />;
  return <Outlet />;
};

export default AuthGuard;
