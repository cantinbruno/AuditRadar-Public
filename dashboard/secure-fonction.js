function bindMainActions() {
  const btnMe = document.getElementById("btnMe");
  const btnLogout = document.getElementById("btnLogout");
  const btnAudit = document.getElementById("btnAudit"); // Récupérer le bouton d'audit
  const modal = document.getElementById("modal"); // Récupérer la fenêtre modale
  const closeModal = document.getElementById("closeModal"); // Récupérer la croix pour fermer

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