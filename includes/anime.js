// Sélectionner le canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajuster la taille du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Créer une image pour l'arrière-plan
const backgroundImage = new Image();
backgroundImage.src = 'cybersecurity-background.jpg';  // Remplace par le chemin de ton image

let x = 0;
let y = 0;

// Fonction pour dessiner l'image et la déplacer
function animateBackground() {
    // Effacer le canvas à chaque frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner l'image en mouvement
    ctx.drawImage(backgroundImage, x, y, canvas.width, canvas.height);
    
    // Déplacer l'image horizontalement
    x -= 1; // Déplacer l'image vers la gauche

    // Réinitialiser la position de l'image si elle est complètement décalée
    if (x <= -canvas.width) {
        x = 0;
    }

    // Boucle d'animation
    requestAnimationFrame(animateBackground);
}

// Attendre que l'image soit chargée avant de commencer l'animation
backgroundImage.onload = () => {
    animateBackground();
};
