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

      // Ajouter les gestionnaires d'événements après que le DOM ait été mis à jour
      this.addEventListeners();

    } catch (error) {
      // En cas d'erreur, afficher l'erreur dans le div
      this.querySelector("#profileData").innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
    }
  }

  // Ajout des événements après la mise à jour du DOM
  addEventListeners() {
    const updateEmailBtn = this.querySelector("#updateEmailBtn");
    const updatePasswordBtn = this.querySelector("#updatePasswordBtn");
    const deactivateAccountBtn = this.querySelector("#deactivateAccountBtn");

    if (updateEmailBtn) {
      updateEmailBtn.addEventListener("click", () => this.updateEmail());
    }
    if (updatePasswordBtn) {
      updatePasswordBtn.addEventListener("click", () => this.updatePassword());
    }
    if (deactivateAccountBtn) {
      deactivateAccountBtn.addEventListener("click", () => this.deactivateAccount());
    }
  }

  // Fonction pour mettre à jour l'email
  async updateEmail() {
    const newEmail = this.querySelector("#newEmail").value;
    const currentEmail = this.querySelector("#profileData .plan").textContent;

    if (newEmail && newEmail !== currentEmail) {
      this.toggleLoading(true);  // Afficher un état de chargement
      try {
        console.log("Données envoyées :", { new_email: newEmail });
        const response = await request("/auth/update-email", {
          method: "POST",
          body: JSON.stringify({ new_email: newEmail }),
        });

        if (response.ok) {
          alert("Adresse mail mise à jour avec succès!");
          this.getProfile(); // Recharger les données après mise à jour
        } else {
          alert(`Erreur lors de la mise à jour : ${response.error || 'Inconnue'}`);
        }
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      } finally {
        this.toggleLoading(false);  // Masquer l'état de chargement
      }
    } else {
      alert("Veuillez entrer une nouvelle adresse mail.");
    }
  }

  // Fonction pour mettre à jour le mot de passe
  async updatePassword() {
    const oldPassword = this.querySelector("#oldPassword").value;
    const newPassword = this.querySelector("#newPassword").value;

    if (oldPassword && newPassword) {
      this.toggleLoading(true);  // Afficher un état de chargement
      try {
        const response = await request("/auth/update-password", {
          method: "POST",
          body: JSON.stringify({ oldPassword, newPassword }),
        });

        if (response.ok) {
          alert("Mot de passe mis à jour avec succès!");
          this.getProfile(); // Recharger les données après mise à jour
        } else {
          alert(`Erreur lors de la mise à jour du mot de passe : ${response.error || 'Inconnue'}`);
        }
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      } finally {
        this.toggleLoading(false);  // Masquer l'état de chargement
      }
    } else {
      alert("Veuillez entrer l'ancien et le nouveau mot de passe.");
    }
  }

  // Fonction pour désactiver le compte
  async deactivateAccount() {
    const confirmation = confirm("Êtes-vous sûr de vouloir désactiver votre compte ?");
    if (confirmation) {
      this.toggleLoading(true);  // Afficher un état de chargement
      try {
        const response = await request("/auth/deactivate", {
          method: "POST",
        });

        if (response.ok) {
          alert("Votre compte a été désactivé.");
          this.getProfile(); // Recharger les données après la désactivation
        } else {
          alert(`Erreur lors de la désactivation du compte : ${response.error || 'Inconnue'}`);
        }
      } catch (error) {
        alert(`Erreur : ${error.message}`);
      } finally {
        this.toggleLoading(false);  // Masquer l'état de chargement
      }
    }
  }

  // Fonction pour gérer l'état de chargement
  toggleLoading(isLoading) {
    const buttons = this.querySelectorAll("button");
    buttons.forEach(button => {
      if (isLoading) {
        button.disabled = true;
        button.innerText = "Chargement...";
      } else {
        button.disabled = false;
        button.innerText = button.dataset.originalText || button.innerText;
      }
    });
  }
}

// Enregistrer le Web Component sous le nom 'profil-db'
customElements.define('profil-db', Profil);

// Fonction request utilisant fetch
async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  return await response.json();
}