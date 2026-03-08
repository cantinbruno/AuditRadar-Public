function bindMainActions() {
  const btnRegister = document.getElementById("btnRegister");
  const btnLogin = document.getElementById("btnLogin");
  const btnMe = document.getElementById("btnMe");
  const btnLogout = document.getElementById("btnLogout");

  if (btnRegister) btnRegister.onclick = registerUser;
  if (btnLogin) btnLogin.onclick = loginUser;
  if (btnMe) btnMe.onclick = getProfile;
  if (btnLogout) btnLogout.onclick = logoutUser;
}

async function getProfile() {
  try {
    const data = await request("/auth/me");
    setOut(data);
  } catch (error) {
    setOut(error);
  }
}

function logoutUser() {
  clearToken();
  showAuth();
  setOut("Déconnexion réussie.");
}
