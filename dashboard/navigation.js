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
        const targetComponent = event.target.getAttribute('data-target');  // Récupère le nom du composant cible
        this.loadComponent(targetComponent);  // Charge le composant correspondant
      });
    });
  }

  // Charge dynamiquement le composant correspondant
  loadComponent(componentName) {
    console.log(`Chargement du composant : ${componentName}`);
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = '';  // Vider le contenu existant avant d'ajouter un nouveau

    if (componentName === 'main-db') {
      const mainComponent = document.createElement('main-db');
      contentContainer.appendChild(mainComponent);  // Ajouter le composant main-db
    } else if (componentName === 'about-db') {
      const aboutComponent = document.createElement('about-db');
      contentContainer.appendChild(aboutComponent);  // Ajouter le composant about-db
    }
    // Ajouter d'autres composants comme 'services-db', 'contact-db', etc.
  }
}

customElements.define('navigation-bar', Navigation);  // Définir le composant 'navigation-bar'