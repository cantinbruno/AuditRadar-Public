 // Ajout des écouteurs d'événements pour les liens de navigation
  addNavigationEventListeners() {
    const links = this.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();  // Empêche le comportement par défaut du lien (navigation)
        const targetScript = event.target.getAttribute('data-target');  // Récupère le fichier JS cible
        this.loadScript(targetScript);  // Charge le script correspondant
        this.toggleSections(event.target.hash);  // Affiche la section correspondante et cache les autres
      });
    });
  }

  // Charge dynamiquement le script JS correspondant
  loadScript(scriptName) {
    const script = document.createElement('script');
    script.src = scriptName;
    script.type = 'module';
    document.body.appendChild(script);
  }

  // Charge le script par défaut (home.js) au démarrage
  loadDefaultScript() {
    const defaultScript = 'home.js';  // Spécifiez ici le script par défaut à charger
    this.loadScript(defaultScript);
    this.toggleSections('#home');  // Affiche la section "home" par défaut
  }

  // Affiche la section cible et cache les autres
  toggleSections(targetId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      if (section.id === targetId.slice(1)) {
        section.style.display = 'block';  // Affiche la section cible
      } else {
        section.style.display = 'none';  // Cache les autres sections
      }
    });
  }

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

function initAuthUI() {
  bindMainActions();
  bindAuthSwitch();
  checkAuth();
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

