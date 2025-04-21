import { useState } from "react";
import Logo from "../../../assets/images/logo.svg?react";
import ShowPasswordIcon from "../../../assets/images/show-password.svg?react";
import HidePasswordIcon from "../../../assets/images/hide-password.svg?react";
import { Link, useNavigate } from "react-router";
import "../common-auth.css";
import { AuthService } from "../../../services/auth.ts";

export function Registration() {
  const [error, setError] = useState("");
  const [isPending, setPending] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  function register(e: React.MouseEvent<HTMLButtonElement>) {
    let form = e.currentTarget.form;
    if (form?.checkValidity()) {
      e.preventDefault();
      setPending(true);
      AuthService.register({ name: form!.username.value, email: form!.email.value, password: form!.password.value })
        .then(async (res) => {
          if (res.ok) navigate("/login");
          else setError(await res.text());
        })
        .catch(() => setError("Network Error"))
        .finally(() => setPending(false));
    }
  }
  function togglePasswordVisibility() {
    setPasswordVisibility((visible) => !visible);
  }
  return (
    <div className="registration-page authentication-page">
      <div className="authentication-card">
        <Logo />
        <form>
          <span className="error">{error}</span>
          <div className="input-container">
            <label htmlFor="username">Name</label>
            <input id="username" name="username" type="text" required></input>
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required></input>
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
          <div className="input-container">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type={isPasswordVisible ? "text" : "password"}
              required
            ></input>
            {isPasswordVisible ? (
              <ShowPasswordIcon className="toggle-password-icon" onClick={togglePasswordVisibility} />
            ) : (
              <HidePasswordIcon className="toggle-password-icon" onClick={togglePasswordVisibility} />
            )}
          </div>
          <button id="btn-register" className="btn-pink" onClick={register} disabled={isPending}>
            Register
          </button>
          <p className="or-line">Or</p>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
