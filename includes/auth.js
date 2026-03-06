const API = "https://api.wavetools.fr";

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

function setMessage(id, value, type = "error") {
  const el = document.getElementById(id);
  if (!el) return;

  if (!value) {
    el.textContent = "";
    el.classList.remove("is-error", "is-success");
    return;
  }

  el.textContent = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  el.classList.remove("is-error", "is-success");
  el.classList.add(type === "success" ? "is-success" : "is-error");
}

function clearMessage(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.textContent = "";
  el.classList.remove("is-error", "is-success");
}

function extractErrorMessage(error) {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if (typeof error.detail === "string") return error.detail;

    if (Array.isArray(error.detail) && error.detail.length > 0) {
      return error.detail.map(item => item.msg || JSON.stringify(item)).join(", ");
    }
  }

  return "Une erreur est survenue.";
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
    return false;
  }

  try {
    await request("/auth/me");
    showProtected();
    return true;
  } catch (error) {
    clearToken();
    showAuth();
    return false;
  }
}

window.AuditRadarCore = {
  API,
  saveToken,
  getToken,
  clearToken,
  showAuth,
  showProtected,
  setMessage,
  clearMessage,
  extractErrorMessage,
  request,
  checkAuth
};
