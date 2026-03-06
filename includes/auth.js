const API = "https://api.wavetools.fr";

/* -----------------------------
   AFFICHAGE MESSAGE
----------------------------- */

function setOut(value) {
  const out = document.getElementById("out");
  if (!out) return;

  out.textContent =
    typeof value === "string"
      ? value
      : JSON.stringify(value, null, 2);
}

/* -----------------------------
   TOKEN
----------------------------- */

function saveToken(token) {
  localStorage.setItem("access_token", token);
}

function getToken() {
  return localStorage.getItem("access_token");
}

function clearToken() {
  localStorage.removeItem("access_token");
}

/* -----------------------------
   UI AUTH / PROTECTED
----------------------------- */

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

/* -----------------------------
   REQUEST API
----------------------------- */

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
    method: method,
    headers: headers,
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

/* -----------------------------
   CHECK AUTH
----------------------------- */

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

/* -----------------------------
   REGISTER
----------------------------- */

async function registerUser() {
  try {
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;

    if (!email || !password) {
      setOut("Veuillez remplir email et mot de passe.");
      return;
    }

    await request("/auth/register", {
      method: "POST",
      body: {
        email: email,
        password: password
      }
    });

    const loginData = await request("/auth/login", {
      method: "POST",
      body: {
        email: email,
        password: password
      }
    });

    saveToken(loginData.access_token);

    showProtected();

    setOut("Inscription réussie.");
  } catch (error) {
    setOut(error);
  }
}

/* -----------------------------
   LOGIN
----------------------------- */

async function loginUser() {
  try {
    const email = document.getElementById("logEmail").value.trim();
    const password = document.getElementById("logPass").value;

    if (!email || !password) {
      setOut("Veuillez remplir email et mot de passe.");
      return;
    }

    const data = await request("/auth/login", {
      method: "POST",
      body: {
        email: email,
        password: password
      }
    });

    saveToken(data.access_token);

    showProtected();

    setOut("Connexion réussie.");
  } catch (error) {
    setOut(error);
  }
}

/* -----------------------------
   PROFILE
----------------------------- */

async function getProfile() {
  try {
    const data = await request("/auth/me");
    setOut(data);
  } catch (error) {
    setOut(error);
  }
}

/* -----------------------------
   RUN SCRIPT
----------------------------- */

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

/* -----------------------------
   LOGOUT
----------------------------- */

function logoutUser() {
  clearToken();
  showAuth();
  setOut("Déconnexion réussie.");
}

/* -----------------------------
   SWITCH LOGIN / REGISTER
----------------------------- */

function switchAuthPanel(panel) {
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");

  const showLogin = document.getElementById("showLogin");
  const showRegister = document.getElementById("showRegister");

  if (
    !loginPanel ||
    !registerPanel ||
    !showLogin ||
    !showRegister
  ) {
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

/* -----------------------------
   INIT
----------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const waitForElements = () => {
    const btnRegister = document.getElementById("btnRegister");
    const btnLogin = document.getElementById("btnLogin");

    const btnMe = document.getElementById("btnMe");
    const btnRun = document.getElementById("btnRun");
    const btnLogout = document.getElementById("btnLogout");

    const showLogin = document.getElementById("showLogin");
    const showRegister = document.getElementById("showRegister");

    const goLogin = document.getElementById("goLogin");
    const goRegister = document.getElementById("goRegister");

    if (!btnRegister || !btnLogin) {
      setTimeout(waitForElements, 50);
      return;
    }

    /* auth */

    btnRegister.addEventListener("click", registerUser);
    btnLogin.addEventListener("click", loginUser);

    /* secure */

    if (btnMe) {
      btnMe.addEventListener("click", getProfile);
    }

    if (btnRun) {
      btnRun.addEventListener("click", runScript);
    }

    if (btnLogout) {
      btnLogout.addEventListener("click", logoutUser);
    }

    /* switch */

    if (showLogin) {
      showLogin.addEventListener("click", function () {
        switchAuthPanel("login");
      });
    }

    if (showRegister) {
      showRegister.addEventListener("click", function () {
        switchAuthPanel("register");
      });
    }

    if (goLogin) {
      goLogin.addEventListener("click", function () {
        switchAuthPanel("login");
      });
    }

    if (goRegister) {
      goRegister.addEventListener("click", function () {
        switchAuthPanel("register");
      });
    }

    checkAuth();
  };

  waitForElements();
});
