const loginUrl = "https://woven-name-321505.appspot.com/api/auth/";

window.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(loginUrl, email, password);
  }
});

async function login(url, email, password) {
  const body = { email: email, password: GCrypto.hash(password) };
  try {
    const response = await httpPost(url, JSON.stringify(body));
    const token = response.getResponseHeader("x-auth-token");
    if (!token) {
      resetForm();
      return;
    }
    localStorage.setItem("x-auth-token", token);
    window.location.replace("index.html");
  } catch (error) {
    console.log(error);
    resetForm();
  }
}

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
