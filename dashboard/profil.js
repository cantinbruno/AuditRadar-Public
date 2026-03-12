class Profil extends HTMLElement {
  connectedCallback() {
    // Définir la structure HTML du composant avec des styles internes pour améliorer l'affichage
    this.innerHTML = `
      <div class="content">
        <div id="profileData" class="profile-details">
          <!-- Les données du profil seront affichées ici -->
        </div>
      </div>
    `;
    // Appeler la fonction pour récupérer et afficher les données
    this.getProfile();
  }

  async getProfile() {
    try {
      const data = await request("/auth/me"); // Effectuer la requête API

      // Construire un affichage structuré des données
      const profileHtml = `
        <p><span class="label">Email:</span> <span class="plan">${data.email}</span></p>
        <label for="">Modifier votre adresse mail :</label>
        <input type="text" id="" placeholder="Entrez votre nouvelle adresse mail">
        <button>Confirmer la modification</button>

        <label for="">Modifier votre mot de passe :</label>
        <input type="text" id="" placeholder="Entrez votre ancien mot de passe">
        <input type="text" id="" placeholder="Entrez votre nouveau mot de passe">
        <button>Confirmer la modification</button>

        <p><span class="label">Plan:</span> <span class="plan">${data.plan}</span></p>
        <p><span class="label">État:</span> <span class="${data.is_active ? 'active' : 'inactive'}">${data.is_active ? 'Actif' : 'Inactif'}</span></p>
        <button>Désactiver mon compte</button>
      `;

      // Afficher les données dans le div 'profileData'
      this.querySelector("#profileData").innerHTML = profileHtml;

    } catch (error) {
      // En cas d'erreur, afficher l'erreur dans le div
      this.querySelector("#profileData").innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
    }
  }
}

// Enregistrer le Web Component sous le nom 'profil-db'
customElements.define('profil-db', Profil);