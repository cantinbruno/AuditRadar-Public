const API = "https://api.wavetools.fr";

function setOut(value) {
  const out = document.getElementById("out");
  if (!out) return;

  out.textContent =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);

  out.classList.remove("is-error", "is-success");

  if (typeof value === "string" && (
    value.toLowerCase().includes("réussie") ||
    value.toLowerCase().includes("active") ||
    value.toLowerCase().includes("connecté")
  )) {
    out.classList.add("is-success");
  } else {
    out.classList.add("is-error");
  }
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
  document.getElementById("authBox").style.display = "block";
  document.getElementById("protectedContent").style.display = "none";
}

function showProtected() {
  document.getElementById("authBox").style.display = "none";
  document.getElementById("protectedContent").style.display = "block";
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

async function checkAuth() {
  const token = getToken();

  if (!token) {
    showAuth();
    return;
  }

  try {
    await request("/auth/me");
    showProtected();
    setOut("Session active.");
  } catch (error) {
    clearToken();
    showAuth();
    setOut("Session invalide. Merci de vous reconnecter.");
  }
}

async function registerUser() {
  try {
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;

    if (!email || !password) {
      setOut("Veuillez remplir l'email et le mot de passe.");
      return;
    }

    await request("/auth/register", {
      method: "POST",
      body: { email, password }
    });

    const loginData = await request("/auth/login", {
      method: "POST",
      body: { email, password }
    });

    saveToken(loginData.access_token);
    showProtected();
    setOut("Inscription réussie.");
  } catch (error) {
    setOut(error);
  }
}

async function loginUser() {
  try {
    const email = document.getElementById("logEmail").value.trim();
    const password = document.getElementById("logPass").value;

    if (!email || !password) {
      setOut("Veuillez remplir l'email et le mot de passe.");
      return;
    }

    const data = await request("/auth/login", {
      method: "POST",
      body: { email, password }
    });

    saveToken(data.access_token);
    showProtected();
    setOut("Connexion réussie.");
  } catch (error) {
    setOut(error);
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
      setOut("Le nom du script est vide.");
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

document.addEventListener("DOMContentLoaded", function () {
  const waitForElements = () => {
    const btnRegister = document.getElementById("btnRegister");
    const btnLogin = document.getElementById("btnLogin");
    const btnMe = document.getElementById("btnMe");
    const btnRun = document.getElementById("btnRun");
    const btnLogout = document.getElementById("btnLogout");

    if (!btnRegister || !btnLogin || !btnMe || !btnRun || !btnLogout) {
      setTimeout(waitForElements, 50);
      return;
    }

    btnRegister.addEventListener("click", registerUser);
    btnLogin.addEventListener("click", loginUser);
    btnMe.addEventListener("click", getProfile);
    btnRun.addEventListener("click", runScript);
    btnLogout.addEventListener("click", logoutUser);

    checkAuth();
  };

  waitForElements();
});
