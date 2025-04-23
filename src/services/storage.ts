function setSessionLogin(token: string, username: string) {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("username", username);
}

function setPermanentLogin(token: string, username: string) {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
}

function isLoggedIn() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

function getUserName() {
  return sessionStorage.getItem("username") || localStorage.getItem("username");
}

function getAccessToken() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

export const StorageService = { setSessionLogin, setPermanentLogin, isLoggedIn, getAccessToken, getUserName };
