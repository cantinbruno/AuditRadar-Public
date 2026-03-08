class AuthBox extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section id="authBox" class="ar-auth">
        <div class="ar-auth__shell">
          <div class="ar-auth__container">
            <!-- Image à gauche -->
            <div class="ar-auth__image">
              <img src="chemin/vers/ton/image.jpg" alt="Audit Informatique">
            </div>

            <!-- Partie formulaire à droite -->
            <div class="ar-auth__form">
              <div class="ar-auth__intro">
                <h2 class="ar-auth__title">Accès à la plateforme d'audit</h2>
                <p class="ar-auth__subtitle">
                  Connectez-vous à votre espace personnel ou créez un compte pour accéder instantanément aux fonctionnalités avancées de Audit Radar, votre plateforme d'audit informatique en un clic.
                </p>
              </div>

              <div class="ar-auth__panel-wrap">
                <!-- FORMULAIRE CONNEXION -->
                <article id="loginPanel" class="ar-auth__card ar-auth__card--login">
                  <div class="ar-auth__card-top">
                    <div class="ar-auth__icon ar-auth__icon--primary">
                      <span>→</span>
                    </div>

                    <div>
                      <h3 class="ar-auth__card-title">Connexion</h3>
                      <p class="ar-auth__card-text">
                        Retrouvez votre espace sécurisé.
                      </p>
                    </div>
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
                      placeholder="Entrez votre mot de passe"
                      autocomplete="current-password">
                  </div>

                  <div id="loginErrorMessage" class="error-message"></div> <!-- Zone d'erreur pour la connexion -->

                  <div class="ar-auth__actions">
                    <button
                      id="btnLogin"
                      class="ar-auth__button ar-auth__button--primary"
                      type="button">
                      Se connecter
                    </button>
                  </div>

                  <p class="ar-auth__bottom-text">
                    Pas encore inscrit ?
                    <button id="goRegister" class="ar-auth__link-btn" type="button">
                      Créer un compte
                    </button>
                  </p>
                </article>

                <!-- FORMULAIRE INSCRIPTION -->
                <article id="registerPanel" class="ar-auth__card ar-auth__card--register ar-auth__card--hidden">
                  <div class="ar-auth__card-top">
                    <div class="ar-auth__icon ar-auth__icon--soft">
                      <span>+</span>
                    </div>

                    <div>
                      <h3 class="ar-auth__card-title">Créer un compte</h3>
                      <p class="ar-auth__card-text">
                        Ouvrez votre accès en quelques secondes.
                      </p>
                    </div>
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
                      placeholder="Choisissez un mot de passe"
                      autocomplete="new-password">
                  </div>

                  <div id="registerErrorMessage" class="error-message"></div> <!-- Zone d'erreur pour l'inscription -->

                  <div class="ar-auth__actions">
                    <button
                      id="btnRegister"
                      class="ar-auth__button ar-auth__button--secondary"
                      type="button">
                      S'inscrire
                    </button>
                  </div>

                  <p class="ar-auth__bottom-text">
                    Déjà inscrit ?
                    <button id="goLogin" class="ar-auth__link-btn" type="button">
                      Se connecter
                    </button>
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("auth-box", AuthBox);
