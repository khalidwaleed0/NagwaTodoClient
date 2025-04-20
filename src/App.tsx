import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import { Login } from "./pages/auth/login";
import { Registration } from "./pages/auth/registration";
import { List } from "./pages/list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<List />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
