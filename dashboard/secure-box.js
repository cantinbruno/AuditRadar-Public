class SecureBox extends HTMLElement {
  connectedCallback() {
    // Structure de base de SecureBox, avec la barre de navigation et le conteneur de contenu
    this.innerHTML = `
      <section id="protectedContent">
        <button id="btnLogout" type="button">Déconnexion</button>
        <button id="btnAudit" type="button">Démarrer un audit</button>

        <div id="modal" class="modal">
          <div class="modal-content">
            <span id="closeModal" class="close">&times;</span>
            <h2>Consentement à l'Audit</h2>

            <p><strong>Avertissement légal :</strong></p>
            <ul>
              <li>En réalisant cet audit, vous pouvez avoir accès à des informations sensibles. Vous devez vous assurer que vous avez l'autorisation explicite pour procéder à cet audit.</li>
              <li>Vous êtes responsable de toutes les actions que vous effectuez lors de cet audit.</li>
              <li>L'audit peut entraîner des modifications du système ou des risques de sécurité. Vous devez être certain que l'impact de l'audit est acceptable.</li>
              <li>Vous vous engagez à respecter toutes les lois et régulations applicables.</li>
            </ul>

            <p><strong>Déclaration d'attestation :</strong></p>
            <p>
              Je, <span id="fullName"></span>, certifie que je suis autorisé(e) à effectuer cet audit sur ce système, conformément aux lois et régulations en vigueur. Je m'engage à respecter toutes les politiques de sécurité et de confidentialité.<br>
              Date : <span id="currentDate"></span>
            </p>

            <label for="firstName">Prénom :</label>
            <input type="text" id="firstName" placeholder="Entrez votre prénom">

            <label for="lastName">Nom :</label>
            <input type="text" id="lastName" placeholder="Entrez votre nom">

            <label>
              <input type="checkbox" id="consentCheckbox"> Je certifie que j'ai les autorisations nécessaires pour effectuer cet audit et que je comprends les risques associés.
            </label>
            <!-- Champ pour entrer l'IP ou domaine à scanner -->
            <label for="scanTarget">IP ou Domaine à scanner :</label>
            <input type="text" id="scanTarget" placeholder="Entrez l'IP ou domaine">
            <button id="startAuditBtn" disabled>Lancer l'audit</button>
            <small id="scanTargetError" class="input-error"></small>
          </div>
        </div>

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