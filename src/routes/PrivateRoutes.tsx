import { Navigate, Outlet } from "react-router-dom";
import { StorageService } from "../services/storage";

export const PrivateRoutes = () => {
	return StorageService.isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};
