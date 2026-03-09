class Navigation extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="sidebar-container">
        <ul class="nav-list">
          <br>
          <li class="nav-item"><a class="nav-link" data-target="main-db">Général</a></li>
          <li class="nav-item"><a class="nav-link" data-target="about-db">About</a></li>
          <li class="nav-item"><a class="nav-link" data-target="services-db">Services</a></li>
          <li class="nav-item"><a class="nav-link" data-target="contact-db">Contact</a></li>
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
        const targetComponent = event.target.getAttribute('data-target');  // Récupère le composant cible
        this.loadComponent(targetComponent);  // Charge le composant correspondant
      });
    });
  }

  // Charge dynamiquement le composant correspondant
  loadComponent(componentName) {
  const contentContainer = document.getElementById('content-container');

  // Vider le conteneur avant d'ajouter le nouveau composant
  contentContainer.innerHTML = '';

  // Ajouter dynamiquement le composant sélectionné
  const newComponent = document.createElement(componentName);
  contentContainer.appendChild(newComponent);  // Ajouter le composant (comme main-db, about-db, etc.)

  // Réattacher les événements nécessaires après l'insertion du composant
  bindMainActions();  // Réattacher les actions aux boutons (login, register, etc.)

  // Si vous avez des actions supplémentaires spécifiques à chaque composant, vous pouvez les ajouter ici
  if (componentName === 'main-db') {
    // Réattacher ou initialiser des actions spécifiques pour main-db si nécessaire
    console.log("Composant main-db chargé.");
  }

  if (componentName === 'about-db') {
    // Réattacher ou initialiser des actions spécifiques pour about-db si nécessaire
    console.log("Composant about-db chargé.");
  }

  // Ajoutez des conditions similaires pour d'autres composants comme 'services-db', 'contact-db', etc.
}
}

customElements.define('navigation-bar', Navigation);  // Définir le composant 'navigation-bar'