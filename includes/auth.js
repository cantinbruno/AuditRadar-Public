const API = "https://api.wavetools.fr";

function setOut(value) {
  const out = document.getElementById("out");
  if (!out) return;

  out.textContent =
    typeof value === "string"
      ? value
      : JSON.stringify(value, null, 2);
}

function saveToken(token) {
  localStorage.setItem("access_token", token);
}

function getToken() {
  return localStorage.getItem("access_token");
}

function clearToken() {
  localStorage.removeItem("access_token");
}

function showAuth() {
  const authBox = document.getElementById("authBox");
  const protectedContent = document.getElementById("protectedContent");

  if (authBox) authBox.style.display = "block";
  if (protectedContent) protectedContent.style.display = "none";
}

function showProtected() {
  const authBox = document.getElementById("authBox");
  const protectedContent = document.getElementById("protectedContent");

  if (authBox) authBox.style.display = "none";
  if (protectedContent) protectedContent.style.display = "block";
}

async function request(path, options = {}) {
  const method = options.method || "GET";
  const body = options.body || null;

  const headers = {};
  const token = getToken();

  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  if (body !== null) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(API + path, {
    method,
    headers,
    body: body !== null ? JSON.stringify(body) : null
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw data;
  }

  return data;
}

async function checkAuth() {
  const token = getToken();

  if (!token) {
    showAuth();
    return;
  }

  try {
    await request("/auth/me");
    showProtected();
  } catch (error) {
    clearToken();
    showAuth();
  }
}

async function loginUser() {
  try {
    const email = document.getElementById("logEmail").value.trim();
    const password = document.getElementById("logPass").value;

    if (!email || !password) {
      document.getElementById("loginErrorMessage").textContent = "Veuillez remplir email et mot de passe.";
      return;
    }

    // Requête de connexion
    const data = await request("/auth/login", {
      method: "POST",
      body: { email, password }
    });

    saveToken(data.access_token);
    showProtected(); // Passage à la zone protégée
    setOut("Connexion réussie.");
  } catch (error) {
    // Si l'erreur est liée à un mot de passe incorrect
    if (error.message === "Invalid credentials") {
      document.getElementById("loginErrorMessage").textContent = "Mot de passe incorrect.";
    } else {
      document.getElementById("loginErrorMessage").textContent = "Erreur lors de la connexion. Veuillez réessayer.";
    }
  }
}

async function registerUser() {
  try {
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;

    if (!email || !password) {
      document.getElementById("registerErrorMessage").textContent = "Veuillez remplir email et mot de passe.";
      return;
    }

    // Validation du mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      document.getElementById("registerErrorMessage").textContent = "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.";
      return;
    }

    // Requête API d'enregistrement
    await request("/auth/register", {
      method: "POST",
      body: { email, password }
    });

    // Connexion automatique après inscription
    const loginData = await request("/auth/login", {
      method: "POST",
      body: { email, password }
    });

    saveToken(loginData.access_token);
    showProtected();
    setOut("Inscription réussie.");
  } catch (error) {
    document.getElementById("registerErrorMessage").textContent = "Erreur lors de l'inscription. Veuillez réessayer.";
  }
}

async function getProfile() {
  try {
    const data = await request("/auth/me");
    setOut(data);
  } catch (error) {
    setOut(error);
  }
}

async function runScript() {
  try {
    const script = document.getElementById("scriptName").value.trim();

    if (!script) {
      setOut("Nom du script vide.");
      return;
    }

    const data = await request("/run/" + encodeURIComponent(script));
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

/* -----------------------------
   SWAP LOGIN / REGISTER
----------------------------- */

function switchAuthPanel(panel) {
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");

  const showLogin = document.getElementById("showLogin");
  const showRegister = document.getElementById("showRegister");

  if (!loginPanel || !registerPanel || !showLogin || !showRegister) {
    console.warn("Swap auth impossible : éléments manquants");
    return;
  }

  if (panel === "register") {
    loginPanel.classList.add("ar-auth__card--hidden");
    registerPanel.classList.remove("ar-auth__card--hidden");

    showLogin.classList.remove("ar-auth__switch-btn--active");
    showRegister.classList.add("ar-auth__switch-btn--active");
  } else {
    registerPanel.classList.add("ar-auth__card--hidden");
    loginPanel.classList.remove("ar-auth__card--hidden");

    showRegister.classList.remove("ar-auth__switch-btn--active");
    showLogin.classList.add("ar-auth__switch-btn--active");
  }
}

function bindAuthSwitch() {
  const showLogin = document.getElementById("showLogin");
  const showRegister = document.getElementById("showRegister");
  const goLogin = document.getElementById("goLogin");
  const goRegister = document.getElementById("goRegister");

  if (showLogin) {
    showLogin.onclick = function () {
      switchAuthPanel("login");
    };
  }

  if (showRegister) {
    showRegister.onclick = function () {
      switchAuthPanel("register");
    };
  }

  if (goLogin) {
    goLogin.onclick = function () {
      switchAuthPanel("login");
    };
  }

  if (goRegister) {
    goRegister.onclick = function () {
      switchAuthPanel("register");
    };
  }
}

function bindMainActions() {
  const btnRegister = document.getElementById("btnRegister");
  const btnLogin = document.getElementById("btnLogin");
  const btnMe = document.getElementById("btnMe");
  const btnRun = document.getElementById("btnRun");
  const btnLogout = document.getElementById("btnLogout");

  if (btnRegister) btnRegister.onclick = registerUser;
  if (btnLogin) btnLogin.onclick = loginUser;
  if (btnMe) btnMe.onclick = getProfile;
  if (btnRun) btnRun.onclick = runScript;
  if (btnLogout) btnLogout.onclick = logoutUser;
}

function initAuthUI() {
  bindMainActions();
  bindAuthSwitch();
  checkAuth();
}

document.addEventListener("DOMContentLoaded", function () {
  let tries = 0;

  const waitForElements = () => {
    const authBox = document.getElementById("authBox");
    const btnLogin = document.getElementById("btnLogin");
    const btnRegister = document.getElementById("btnRegister");
    const loginPanel = document.getElementById("loginPanel");
    const registerPanel = document.getElementById("registerPanel");

    if (authBox && btnLogin && btnRegister && loginPanel && registerPanel) {
      initAuthUI();
      return;
    }

    tries += 1;

    if (tries < 100) {
      setTimeout(waitForElements, 50);
    } else {
      console.warn("Initialisation auth incomplète : éléments introuvables");
    }
  };

  waitForElements();
});
