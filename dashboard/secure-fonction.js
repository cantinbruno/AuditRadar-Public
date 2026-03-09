function bindMainActions() {
  const btnMe = document.getElementById("btnMe");
  const btnLogout = document.getElementById("btnLogout");
  const btnAudit = document.getElementById("btnAudit"); // Récupérer le bouton d'audit
  const modal = document.getElementById("modal"); // Récupérer la fenêtre modale
  const closeModal = document.getElementById("closeModal"); // Récupérer la croix pour fermer
  const consentCheckbox = document.getElementById("consentCheckbox"); // Case à cocher pour consentement
  const startAuditBtn = document.getElementById("startAuditBtn"); // Bouton pour démarrer l'audit
  const scanTargetInput = document.getElementById("scanTarget"); // Champ pour IP ou domaine à scanner
  const firstNameInput = document.getElementById("firstName"); // Champ pour prénom
  const lastNameInput = document.getElementById("lastName"); // Champ pour nom
  const fullNameSpan = document.getElementById("fullName"); // Affichage du nom complet dans la déclaration
  const currentDateSpan = document.getElementById("currentDate"); // Affichage de la date dans la déclaration

  // Fonction pour mettre à jour le nom complet et la date
  function updateDeclaration() {
    const fullName = `${firstNameInput.value} ${lastNameInput.value}`;
    fullNameSpan.textContent = fullName;

    const currentDate = new Date().toLocaleDateString("fr-FR"); // Format français de la date
    currentDateSpan.textContent = currentDate;
  }

  // Mettre à jour la déclaration lorsque le prénom ou le nom change
  if (firstNameInput && lastNameInput) {
    firstNameInput.oninput = updateDeclaration;
    lastNameInput.oninput = updateDeclaration;
  }

  // Mettre à jour la déclaration initiale avec la date
  updateDeclaration();

  // Lier les actions de btnMe et btnLogout
  if (btnMe) btnMe.onclick = getProfile;
  if (btnLogout) btnLogout.onclick = logoutUser;

  // Ouvrir la fenêtre modale au clic sur le bouton d'audit
  if (btnAudit) {
    btnAudit.onclick = () => {
      modal.style.display = 'flex'; // Afficher la modale
    };
  }

  // Fermer la fenêtre modale au clic sur la croix
  if (closeModal) {
    closeModal.onclick = () => {
      modal.style.display = 'none'; // Cacher la modale
    };
  }

  // Fermer la fenêtre modale si l'utilisateur clique en dehors de la fenêtre
  if (modal) {
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none'; // Cacher la modale
      }
    };
  }

  // Activer le bouton "Lancer l'audit" lorsque la case est cochée et l'IP/domaine renseigné
  if (consentCheckbox) {
    consentCheckbox.onchange = () => {
      startAuditBtn.disabled = !consentCheckbox.checked || !scanTargetInput.value || !firstNameInput.value || !lastNameInput.value;
    };
  }

  // Activer le bouton "Lancer l'audit" lorsque l'IP/domaine est renseigné
  if (scanTargetInput) {
    scanTargetInput.oninput = () => {
      startAuditBtn.disabled = !consentCheckbox.checked || !scanTargetInput.value || !firstNameInput.value || !lastNameInput.value;
    };
  }

  // Action du bouton pour démarrer l'audit
  if (startAuditBtn) {
    startAuditBtn.onclick = async () => {
      if (consentCheckbox.checked && scanTargetInput.value && firstNameInput.value && lastNameInput.value) {
        const consentData = {
          consentGiven: {
            fullName: `${firstNameInput.value} ${lastNameInput.value}`, // Nom complet
            date: currentDateSpan.textContent // Date de l'attestation
          },
          scanTarget: scanTargetInput.value // IP ou domaine à scanner
        };

        try {
          // Requête API pour lancer l'audit avec les données de consentement
          const response = await request("/run/scan", {
            method: "POST",
            body: consentData
          });

          // Afficher la réponse de l'API
          console.log("Réponse de l'API :", response);
          alert("Audit lancé avec succès !");
          modal.style.display = 'none'; // Fermer la modale après démarrage
        } catch (error) {
          console.error('Erreur lors de l\'appel API :', error);
          alert("Une erreur s'est produite lors du démarrage de l'audit.");
        }
      } else {
        alert("Vous devez certifier que vous avez les autorisations nécessaires et entrer une IP/domaine valide.");
      }
    };
  }
}

async function getProfile() {
  try {
    const data = await request("/auth/me");
    setOut(data);
  } catch (error) {
    setOut(error);
  }
}

function logoutUser() {
  clearToken();
  showAuth();
  setOut("Déconnexion réussie.");
}