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
      const data = await request("/auth/me"); // Effectuer la requête API pour récupérer les données du profil

      // Construire un affichage structuré des données
      const profileHtml = `
        <p><span class="label">Email:</span> <span class="plan">${data.email}</span></p>
        <label for="">Modifier votre adresse mail :</label>
        <input type="text" id="newEmail" placeholder="Entrez votre nouvelle adresse mail">
        <button id="updateEmailBtn">Confirmer la modification</button>
        
        <label for="">Modifier votre mot de passe :</label>
        <input type="password" id="oldPassword" placeholder="Entrez votre ancien mot de passe">
        <input type="password" id="newPassword" placeholder="Entrez votre nouveau mot de passe">
        <button id="updatePasswordBtn">Confirmer la modification</button>
        
        <p><span class="label">Plan:</span> <span class="plan">${data.plan}</span></p>
        <p><span class="label">État:</span> <span class="${data.is_active ? 'active' : 'inactive'}">${data.is_active ? 'Actif' : 'Inactif'}</span></p>
        <button id="deactivateAccountBtn">Désactiver mon compte</button>
      `;

      // Afficher les données dans le div 'profileData'
      this.querySelector("#profileData").innerHTML = profileHtml;

      // Ajouter les gestionnaires d'événements
      this.querySelector("#updateEmailBtn").addEventListener("click", () => this.updateEmail(data.email));
      this.querySelector("#updatePasswordBtn").addEventListener("click", () => this.updatePassword());
      this.querySelector("#deactivateAccountBtn").addEventListener("click", () => this.deactivateAccount());

    } catch (error) {
      // En cas d'erreur, afficher l'erreur dans le div
      this.querySelector("#profileData").innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
    }
  }

  async updateEmail(currentEmail) {
    const newEmail = this.querySelector("#newEmail").value;
    if (newEmail && newEmail !== currentEmail) {
      try {
        const response = await request("/auth/update-email", {
          method: "POST",
          body: JSON.stringify({ email: newEmail }),
        });
        alert("Adresse mail mise à jour avec succès!");
        this.getProfile(); // Recharger les données après mise à jour
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      }
    } else {
      alert("Veuillez entrer une nouvelle adresse mail.");
    }
  }

  async updatePassword() {
    const oldPassword = this.querySelector("#oldPassword").value;
    const newPassword = this.querySelector("#newPassword").value;
    if (oldPassword && newPassword) {
      try {
        const response = await request("/auth/update-password", {
          method: "POST",
          body: JSON.stringify({ oldPassword, newPassword }),
        });
        alert("Mot de passe mis à jour avec succès!");
        this.getProfile(); // Recharger les données après mise à jour
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      }
    } else {
      alert("Veuillez entrer l'ancien et le nouveau mot de passe.");
    }
  }

  async deactivateAccount() {
    const confirmation = confirm("Êtes-vous sûr de vouloir désactiver votre compte ?");
    if (confirmation) {
      try {
        const response = await request("/auth/deactivate", {
          method: "POST",
        });
        alert("Votre compte a été désactivé.");
        this.getProfile(); // Recharger les données après la désactivation
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      }
    }
  }
}

// Enregistrer le Web Component sous le nom 'profil-db'
customElements.define('profil-db', Profil);