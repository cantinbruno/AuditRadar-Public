const API = "https://api.wavetools.fr";

// Fonction pour afficher la sortie
function setOut(value) {
  const out = document.getElementById("out");
  if (!out) return;

  out.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

// Fonction pour sauvegarder le token dans le cookie
function saveToken(token) {
  document.cookie = `access_token=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
}

// Fonction pour récupérer le token depuis les cookies
function getToken() {
  const name = "access_token=";
  const decodedCookies = decodeURIComponent(document.cookie);
  const ca = decodedCookies.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

// Fonction pour supprimer le token des cookies
function clearToken() {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Fonction générique pour envoyer des requêtes avec le token d'authentification
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
    body: body !== null ? JSON.stringify(body) : null,
    credentials: 'same-origin'
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

// Fonction pour la connexion de l'utilisateur
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

    saveToken(data.access_token); // Sauvegarde le token dans les cookies
    showProtected(); // Passage à la zone protégée
    setOut("Connexion réussie.");
  } catch (error) {
    console.log("Erreur API:", error);

    if (error && error.detail && error.detail === "Bad credentials") {
      document.getElementById("loginErrorMessage").textContent = "Le mot de passe ou l'email est incorrect.";
    } else {
      document.getElementById("loginErrorMessage").textContent = "Erreur lors de la connexion. Veuillez réessayer.";
    }
  }
}

// Fonction pour l'enregistrement de l'utilisateur
async function registerUser() {
  try {
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;

    if (!email || !password) {
      document.getElementById("registerErrorMessage").textContent = "Veuillez remplir email et mot de passe.";
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

    saveToken(loginData.access_token); // Sauvegarde du token dans le cookie
    showProtected(); // Passage à la zone protégée
    setOut("Inscription réussie.");
  } catch (error) {
    if (error && error.detail && error.detail === "Email already exists") {
      document.getElementById("registerErrorMessage").textContent = "Cet email est déjà utilisé. Veuillez en choisir un autre.";
    } else {
      document.getElementById("registerErrorMessage").textContent = "Erreur lors de l'inscription. Veuillez réessayer.";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let tries = 0;

  const waitForElements = () => {
    const authBox = document.getElementById("authBox");
    const loginPanel = document.getElementById("loginPanel");
    const registerPanel = document.getElementById("registerPanel");

    if (authBox && loginPanel && registerPanel) {
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