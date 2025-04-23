import { StorageService } from "./storage";

type UserRegisterData = { name: string; email: string; password: string };
type UserLoginData = { email: string; password: string };

function register(userData: UserRegisterData) {
  return fetch(import.meta.env.VITE_APP_URL + "/auth/register/", {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
    body: JSON.stringify(userData),
  });
}

function login(userData: UserLoginData) {
  return fetch(import.meta.env.VITE_APP_URL + "/auth/login/", {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
    body: JSON.stringify(userData),
  });
}

function logout() {
  return fetch(import.meta.env.VITE_APP_URL + "/auth/logout/", {
    headers: new Headers({
      "content-type": "application/json",
      Authorization: `JWT ${StorageService.getAccessToken()}`,
    }),
    method: "DELETE",
  });
}

export const AuthService = { register, login, logout };
