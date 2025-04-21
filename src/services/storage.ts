function setSessionLogin(token: string) {
  sessionStorage.setItem("token", token);
}

function setPermanentLogin(token: string) {
  localStorage.setItem("token", token);
}

function isLoggedIn() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

function getAccessToken() {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
}

export const StorageService = { setSessionLogin, setPermanentLogin, isLoggedIn, getAccessToken };
