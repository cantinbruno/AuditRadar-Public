class Profil extends HTMLElement {
  connectedCallback() {
    // Définir la structure HTML du composant
    this.innerHTML = `
      <div class="content">
        <div>
          <h2>Espace sécurisé</h2>
          <p>
            Vous êtes connecté. Vous pouvez maintenant accéder aux actions protégées.
          </p>
        </div>
        <div id="profileData"></div> <!-- Élément où les données seront affichées -->
      </div>
    `;

    // Appeler la fonction getProfile après le rendu
    this.getProfile();
  }

  async getProfile() {
    try {
      const data = await request("/auth/me");  // Effectuer la requête API
      // Afficher les données dans le div avec id 'profileData'
      this.querySelector("#profileData").innerText = JSON.stringify(data, null, 2);
    } catch (error) {
      // En cas d'erreur, afficher l'erreur dans le div
      this.querySelector("#profileData").innerText = `Erreur : ${error.message}`;
    }
  }
}

// Enregistrer le Web Component sous le nom 'profil-db'
customElements.define('profil-db', Profil);