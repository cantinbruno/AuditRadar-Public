class Navigation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="sidebar-container">
        <ul class="nav-list">
          <li class="nav-item"><a href="#" class="nav-link" data-target="main-db">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-target="about-db">About</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-target="services-db">Services</a></li>
          <li class="nav-item"><a href="#" class="nav-link" data-target="contact-db">Contact</a></li>
        </ul>
      </div>
    `;
    this.addNavigationEventListeners();
  }

  // Ajout des écouteurs d'événements pour les liens de navigation
  addNavigationEventListeners() {
    const links = this.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();  // Empêche le comportement par défaut du lien (navigation)
        const targetScript = event.target.getAttribute('data-target');  // Récupère le fichier JS cible
        console.log(`Clic détecté sur ${targetScript}`);  // Ajout d'un log pour vérifier le clic
        this.loadScript(targetScript);  // Charge le script correspondant
      });
    });
  }

  // Charge dynamiquement le fichier JavaScript correspondant
  loadScript(scriptName) {
    console.log(`Chargement du fichier script : ${scriptName}`);
    const existingScript = document.querySelector(`script[src="${scriptName}.js"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `${scriptName}.js`;  // Ajouter l'extension .js
      script.onload = () => {
        this.insertContent(scriptName);  // Insérer le contenu une fois le script chargé
      };
      document.body.appendChild(script);
    }
  }

  // Insère dynamiquement le composant dans le conteneur
  insertContent(scriptName) {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';  // Vider le contenu existant avant d'ajouter un nouveau

    if (scriptName === 'main-db') {
      const mainComponent = document.createElement('main-db');
      contentContainer.appendChild(mainComponent);  // Ajouter le composant main-db
    } else if (scriptName === 'about-db') {
      const aboutComponent = document.createElement('about-db');
      contentContainer.appendChild(aboutComponent);  // Ajouter le composant about-db
    }
    // Ajouter d'autres composants comme 'services-db', 'contact-db', etc.
  }
}

customElements.define('navigation-bar', Navigation);  // Définir le composant 'navigation-bar'