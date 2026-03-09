class SecureBox extends HTMLElement {
  connectedCallback() {
    // Structure de base de SecureBox, avec la barre de navigation et le conteneur de contenu
    this.innerHTML = `
      <section id="protectedContent">
        <button id="btnLogout" type="button">Déconnexion</button>
        <button id="btnAudit" type="button">Démarrer un audit</button>
        <navigation-bar></navigation-bar> <!-- Barre de navigation -->
        <div id="content-container"></div> <!-- Conteneur pour afficher le contenu dynamique -->
      </section>
    `;
    this.loadDefaultComponent();  // Charge 'main-db' par défaut
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
    const mainComponent = document.createElement('main-db');
    contentContainer.appendChild(mainComponent);  // Ajouter le composant main-db (le contenu principal)
  }
}

customElements.define("secure-box", SecureBox);  // Définir le composant 'secure-box'