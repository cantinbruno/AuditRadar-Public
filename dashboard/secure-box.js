class SecureBox extends HTMLElement {
  connectedCallback() {
    // Contenu par défaut (affichage de main.js)
    this.innerHTML = `
      <section id="protectedContent">
        <navigation-bar></navigation-bar>
        <div id="content-container"></div>
      </section>
    `;
  }
}
customElements.define("secure-box", SecureBox);  // Définir le composant 'secure-box'