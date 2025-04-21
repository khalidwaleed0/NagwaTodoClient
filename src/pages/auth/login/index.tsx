import { useState } from "react";
import Logo from "../../../assets/images/logo.svg?react";
import ShowPasswordIcon from "../../../assets/images/show-password.svg?react";
import HidePasswordIcon from "../../../assets/images/hide-password.svg?react";
import { Link, useNavigate } from "react-router";
import { AuthService } from "../../../services/auth";
import "../common-auth.css";
import "./style.css";
import { StorageService } from "../../../services/storage";

export function Login() {
  const [error, setError] = useState("");
  const [isPending, setPending] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  function login(e: React.MouseEvent<HTMLButtonElement>) {
    let form = e.currentTarget.form;
    if (form?.checkValidity()) {
      e.preventDefault();
      setPending(true);
      AuthService.login({ email: form!.email.value, password: form!.password.value })
        .then(async (res) => {
          if (res.ok) {
            let token = await res.json();
            if (form["remember-me"].checked) StorageService.setPermanentLogin(token);
            else StorageService.setSessionLogin(token);
            navigate("/");
          } else setError(await res.text());
        })
        .catch(() => setError("Network Error"))
        .finally(() => setPending(false));
    }
  }
  function togglePasswordVisibility() {
    setPasswordVisibility((visible) => !visible);
  }
  return (
    <div className="login-page authentication-page">
      <div className="authentication-card">
        <Logo />
        <form>
          <span className="error">{error}</span>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" required></input>
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type={isPasswordVisible ? "text" : "password"} required></input>
            {isPasswordVisible ? (
              <ShowPasswordIcon className="toggle-password-icon" onClick={togglePasswordVisibility} />
            ) : (
              <HidePasswordIcon className="toggle-password-icon" onClick={togglePasswordVisibility} />
            )}
          </div>
          <button id="btn-login" className="btn-pink" onClick={login} disabled={isPending}>
            Login
          </button>
          <div className="login-options">
            <div className="checkbox-container">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
          </div>
          <p className="or-line">Or</p>
        </form>
        <p>
          Don't have an account ? <Link to="/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
}
