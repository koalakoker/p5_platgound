function checkLogin() {
  if (!localStorage.getItem("x-auth-token")) {
    window.location.replace("login.html");
  }
}
