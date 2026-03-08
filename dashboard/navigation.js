class Navigation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <ul style="list-style-type: none; padding: 0; margin: 0; display: flex;">
          <li style="margin-right: 20px;"><a href="#home">Home</a></li>
          <li style="margin-right: 20px;"><a href="#about">About</a></li>
          <li style="margin-right: 20px;"><a href="#services">Services</a></li>
          <li style="margin-right: 20px;"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}

// Enregistrer le composant personnalisé Navigation
customElements.define('navigation-bar', Navigation);