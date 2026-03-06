class AuthBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="authBox" class="ar-auth">

        <div class="ar-auth__header">
          <h2 class="ar-auth__title">Accès sécurisé</h2>
          <p class="ar-auth__subtitle">
            Connectez-vous à votre espace personnel ou créez un compte pour accéder
            aux fonctionnalités sécurisées de la plateforme.
          </p>
        </div>

        <div class="ar-auth__grid">

          <article class="ar-auth__panel ar-auth__panel--register">
            <div class="ar-auth__panel-header">
              <h3 class="ar-auth__panel-title">Créer un compte</h3>
              <p class="ar-auth__panel-text">
                Créez votre accès en quelques secondes.
              </p>
            </div>

            <div class="ar-auth__form-group">
              <label class="ar-auth__label" for="regEmail">Adresse email</label>
              <input
                id="regEmail"
                class="ar-auth__input"
                type="email"
                placeholder="nom@exemple.fr"
                autocomplete="email">
            </div>

            <div class="ar-auth__form-group">
              <label class="ar-auth__label" for="regPass">Mot de passe</label>
              <input
                id="regPass"
                class="ar-auth__input"
                type="password"
                placeholder="Votre mot de passe"
                autocomplete="new-password">
            </div>

            <button
              id="btnRegister"
              class="ar-auth__button ar-auth__button--secondary"
              type="button">
              S'inscrire
            </button>
          </article>

          <article class="ar-auth__panel ar-auth__panel--login">
            <div class="ar-auth__panel-header">
              <h3 class="ar-auth__panel-title">Connexion</h3>
              <p class="ar-auth__panel-text">
                Retrouvez votre espace sécurisé.
              </p>
            </div>

            <div class="ar-auth__form-group">
              <label class="ar-auth__label" for="logEmail">Adresse email</label>
              <input
                id="logEmail"
                class="ar-auth__input"
                type="email"
                placeholder="nom@exemple.fr"
                autocomplete="email">
            </div>

            <div class="ar-auth__form-group">
              <label class="ar-auth__label" for="logPass">Mot de passe</label>
              <input
                id="logPass"
                class="ar-auth__input"
                type="password"
                placeholder="Votre mot de passe"
                autocomplete="current-password">
            </div>

            <button
              id="btnLogin"
              class="ar-auth__button ar-auth__button--primary"
              type="button">
              Se connecter
            </button>
          </article>

        </div>

      </section>
    `;
  }
}

customElements.define("auth-box", AuthBox);
