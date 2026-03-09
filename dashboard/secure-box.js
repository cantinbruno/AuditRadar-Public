class SecureBox extends HTMLElement {
  connectedCallback() {
    // Contenu par défaut (affichage de main-db)
    this.innerHTML = `
      <section id="protectedContent">
        <navigation-bar></navigation-bar> <!-- Barre de navigation -->
        <div id="content-container"></div> <!-- Conteneur pour afficher le contenu dynamique -->
      </section>
    `;
    this.loadDefaultComponent();  // Charge main-db par défaut
  }

  // Charge le composant par défaut (main-db)
  loadDefaultComponent() {
    const defaultComponent = 'main-db';  // Cible le composant main-db
    this.insertComponent(defaultComponent);   // Insère main-db dans le conteneur
  }

  // Insère dynamiquement le composant dans le conteneur
  insertComponent(componentName) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';  // Vider le conteneur avant d'ajouter du contenu

    if (componentName === 'main-db') {
      const mainComponent = document.createElement('main-db');
      contentContainer.appendChild(mainComponent);  // Ajouter le composant main-db (le contenu principal)
    }
    // Ajouter d'autres composants comme 'about-db', 'services-db', etc.
  }
}

customElements.define("secure-box", SecureBox);  // Définir le composant 'secure-box'