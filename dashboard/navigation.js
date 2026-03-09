class Navigation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="sidebar-container">
        <ul class="nav-list">
          <li class="nav-item"><a href="#home" class="nav-link" data-target="home.js">Home</a></li>
          <li class="nav-item"><a href="#about" class="nav-link" data-target="about.js">About</a></li>
          <li class="nav-item"><a href="#services" class="nav-link" data-target="services.js">Services</a></li>
          <li class="nav-item"><a href="#contact" class="nav-link" data-target="contact.js">Contact</a></li>
        </ul>
      </div>
    `;
    this.addNavigationEventListeners();
    this.loadDefaultScript();  // Charge le script par défaut au démarrage
  }

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
    const existingScript = document.querySelector(`script[src="${scriptName}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptName;
      script.type = 'module';
      document.body.appendChild(script);
    }
  }

  // Charge le script par défaut (home.js) au démarrage
  loadDefaultScript() {
    const defaultScript = '/dashboard/main.js';  // Spécifiez ici le script par défaut à charger
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
}

// Enregistrer le composant personnalisé Navigation
customElements.define('navigation-bar', Navigation);