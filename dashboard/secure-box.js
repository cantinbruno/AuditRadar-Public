class SecureBox extends HTMLElement {
  connectedCallback() {
    // Contenu par défaut (affichage de main.js)
    this.innerHTML = `
      <section id="protectedContent">
        <navigation-bar></navigation-bar> <!-- Barre de navigation -->
        <div id="content-container"></div> <!-- Conteneur pour afficher le contenu dynamique -->
      </section>
    `;
    this.loadDefaultScript();  // Charge main.js par défaut
  }

  // Charge le script par défaut (main.js depuis /dashboard/)
  loadDefaultScript() {
    const defaultScript = '/dashboard/main.js';  // Chemin complet vers main.js
    console.log(`Chargement du script par défaut : ${defaultScript}`);
    this.loadScript(defaultScript);   // Charge le fichier main.js depuis /dashboard/
  }

  // Charge dynamiquement un fichier JavaScript
  loadScript(scriptName) {
    console.log(`Chargement du fichier script : ${scriptName}`);
    const existingScript = document.querySelector(`script[src="${scriptName}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptName;  // Ajouter le chemin complet
      script.onload = () => {
        this.insertContent(scriptName);  // Insérer le contenu une fois le script chargé
      };
      document.body.appendChild(script);
    }
  }

  // Insère dynamiquement le composant dans le conteneur
  insertContent(scriptName) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';  // Vider le conteneur avant d'ajouter du contenu

    if (scriptName === '/dashboard/main.js') {
      const mainComponent = document.createElement('main-db');
      contentContainer.appendChild(mainComponent);  // Ajouter le composant main-db (le contenu principal)
    }
    // Ajouter des conditions similaires pour les autres composants comme 'about-db', 'services-db', etc.
  }
}

customElements.define("secure-box", SecureBox);  // Définir le composant 'secure-box'