class Navigation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="sidebar-container">
          <ul class="nav-list">
            <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="#about" class="nav-link">About</a></li>
            <li class="nav-item"><a href="#services" class="nav-link">Services</a></li>
            <li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </div>
    `;
  }
}

// Enregistrer le composant personnalisé Navigation
customElements.define('navigation-bar', Navigation);