import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
	let isAllowed = false;
	return isAllowed ? <Outlet /> : <Navigate to="/login" />;
};
