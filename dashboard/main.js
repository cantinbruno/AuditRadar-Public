class Main extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <!-- Contenu principal de la page -->
    <div class="content">
        <div>
          <h2>Espace sécurisé</h2>
          <p>
            Vous êtes connecté. Vous pouvez maintenant accéder aux actions protégées.
          </p>
        </div>
        <div>
          <div>
            <label for="scriptName">Nom du script</label>
            <input
              id="scriptName"
              type="text"
              placeholder="Ex: afficher.sh">
          </div>
          <div>
            <button id="btnRun" type="button">
              Exécuter
            </button>
            <button id="btnMe" type="button">
              Mon profil
            </button>
            <button id="btnLogout" type="button">
              Déconnexion
            </button>
          </div>
          <p id="out"></p>
        </div>
    `;
  }
}

customElements.define('main-db', Main);