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
    this.loadDefaultScript();  // Charge le script par défaut au chargement
  }
}

// Enregistrer le composant personnalisé Navigation
customElements.define('navigation-bar', Navigation);