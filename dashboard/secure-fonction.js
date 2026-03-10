function bindMainActions() {
  const btnMe = document.getElementById("btnMe");
  const btnLogout = document.getElementById("btnLogout");
  const btnAudit = document.getElementById("btnAudit");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const consentCheckbox = document.getElementById("consentCheckbox");
  const startAuditBtn = document.getElementById("startAuditBtn");
  const scanTargetInput = document.getElementById("scanTarget");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const fullNameSpan = document.getElementById("fullName");
  const currentDateSpan = document.getElementById("currentDate");
  const scanTargetError = document.getElementById("scanTargetError");

  function updateDeclaration() {
    const fullName = `${firstNameInput.value} ${lastNameInput.value}`;
    fullNameSpan.textContent = fullName.trim();

    const currentDate = new Date().toLocaleDateString("fr-FR");
    currentDateSpan.textContent = currentDate;
  }

  function updateAuditButtonState() {
    const targetError = isBlockedTarget(scanTargetInput.value);

    if (scanTargetError) {
      scanTargetError.textContent = targetError || "";
    }

    if (targetError) {
      scanTargetInput.classList.add("input-invalid");
    } else {
      scanTargetInput.classList.remove("input-invalid");
    }

    startAuditBtn.disabled =
      !consentCheckbox.checked ||
      !scanTargetInput.value.trim() ||
      !firstNameInput.value.trim() ||
      !lastNameInput.value.trim() ||
      !!targetError;
  }

  if (firstNameInput && lastNameInput) {
    firstNameInput.oninput = () => {
      updateDeclaration();
      updateAuditButtonState();
    };

    lastNameInput.oninput = () => {
      updateDeclaration();
      updateAuditButtonState();
    };
  }

  updateDeclaration();

  if (btnMe) btnMe.onclick = getProfile;
  if (btnLogout) btnLogout.onclick = logoutUser;

  if (btnAudit) {
    btnAudit.onclick = () => {
      modal.style.display = "flex";
    };
  }

  if (closeModal) {
    closeModal.onclick = () => {
      modal.style.display = "none";
    };
  }

  if (modal) {
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  if (consentCheckbox) {
    consentCheckbox.onchange = updateAuditButtonState;
  }

  if (scanTargetInput) {
    scanTargetInput.oninput = updateAuditButtonState;
  }

  if (startAuditBtn) {
    startAuditBtn.onclick = async () => {
      if (
        !consentCheckbox.checked ||
        !scanTargetInput.value.trim() ||
        !firstNameInput.value.trim() ||
        !lastNameInput.value.trim()
      ) {
        alert("Vous devez certifier que vous avez les autorisations nécessaires et entrer une IP/domaine valide.");
        return;
      }

      const targetError = isBlockedTarget(scanTargetInput.value);

      if (targetError) {
        alert(targetError);
        return;
      }

      const target = scanTargetInput.value.trim();
      const consent = {
        fullName: `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`,
        date: currentDateSpan.textContent
      };

      try {
        const query = new URLSearchParams({
          arg1: target,
          arg2: JSON.stringify(consent)
        }).toString();

        const response = await request(`/run/scan?${query}`, {
          method: "GET"
        });

        console.log("Réponse de l'API :", response);
        alert("Audit lancé avec succès !");
        modal.style.display = "none";
      } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
        alert("Une erreur s'est produite lors du démarrage de l'audit.");
      }
    };
  }
}

async function getProfile() {
  try {
    const data = await request("/auth/me", {
      credentials: "same-origin"  // Ajouter cette ligne pour envoyer les cookies
    });
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

function isValidIPv4(ip) {
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
  return ipv4Regex.test(ip);
}

function isPrivateIPv4(ip) {
  const parts = ip.split(".").map(Number);

  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    parts[0] === 127 ||
    (parts[0] === 169 && parts[1] === 254) ||
    parts[0] === 0
  );
}

function isValidDomain(domain) {
  const domainRegex =
    /^(?=.{1,253}$)(?!-)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}$/;
  return domainRegex.test(domain);
}

function isBlockedTarget(target) {
  const value = target.trim().toLowerCase();

  if (!value) {
    return "La cible est vide.";
  }

  if (value === "localhost") {
    return "localhost n'est pas autorisé.";
  }

  if (isValidIPv4(value)) {
    if (isPrivateIPv4(value)) {
      return "Les adresses IP privées ou locales ne sont pas autorisées.";
    }
    return null;
  }

  if (isValidDomain(value)) {
    return null;
  }

  return "La cible doit être un nom de domaine valide ou une IP publique valide.";
}