import { Navigate, Outlet } from "react-router-dom";
import { StorageService } from "../services/storage";

export const BypassedRoutes = () => {
	return StorageService.isLoggedIn() ? <Navigate to="/dashboard" /> : <Outlet />;
};
