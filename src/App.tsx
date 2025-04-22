import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Login } from "./pages/auth/login";
import { Registration } from "./pages/auth/registration";
import { Home } from "./pages/home";
import { BypassedRoutes } from "./routes/BypassedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes to be bypassed and redirected to home if already logged in*/}
        <Route element={<BypassedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>
        {/* Routes that cannot be accessed unless logged in */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
