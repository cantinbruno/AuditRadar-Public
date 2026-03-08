class SecureBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="protectedContent">
        
        <navigation-bar></navigation-bar>
        <script src="/dashboard/navigation.js"></script>

        <div class="ar-secure__header">
          <h2 class="ar-secure__title">Espace sécurisé</h2>
          <p class="ar-secure__subtitle">
            Vous êtes connecté. Vous pouvez maintenant accéder aux actions protégées.
          </p>
        </div>

        <div class="ar-secure__content">
          <div class="ar-secure__form-group">
            <label class="ar-secure__label" for="scriptName">Nom du script</label>
            <input
              id="scriptName"
              class="ar-secure__input"
              type="text"
              placeholder="Ex: afficher.sh">
          </div>

          <div class="ar-secure__actions">
            <button id="btnRun" class="ar-secure__button ar-secure__button--primary" type="button">
              Exécuter
            </button>
            <button id="btnMe" class="ar-secure__button ar-secure__button--ghost" type="button">
              Mon profil
            </button>
            <button id="btnLogout" class="ar-secure__button ar-secure__button--danger" type="button">
              Déconnexion
            </button>
          </div>

          <p id="out" class="ar-auth__feedback"></p>
        </div>
      </section>
    `;
  }
}

customElements.define("secure-box", SecureBox);
