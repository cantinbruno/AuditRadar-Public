// Récupérer les éléments
const btnAudit = document.getElementById('btnAudit');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');

// Ouvrir la fenêtre modale au clic sur le bouton
btnAudit.addEventListener('click', () => {
  modal.style.display = 'flex'; // Afficher la modale
});

// Fermer la fenêtre modale au clic sur la croix
closeModal.addEventListener('click', () => {
  modal.style.display = 'none'; // Cacher la modale
});

// Fermer la fenêtre modale si l'utilisateur clique en dehors de la fenêtre
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none'; // Cacher la modale
  }
});

function bindMainActions() {
  const btnMe = document.getElementById("btnMe");
  const btnLogout = document.getElementById("btnLogout");

  if (btnMe) btnMe.onclick = getProfile;
  if (btnLogout) btnLogout.onclick = logoutUser;
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