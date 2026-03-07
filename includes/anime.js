const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Ajuster la taille du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables pour les lignes de données
const lines = [];
const lineCount = 100;

// Crée des lignes de données aléatoires
for (let i = 0; i < lineCount; i++) {
    lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
    });
}

// Fonction pour dessiner les lignes de données
function drawLines() {
    lines.forEach(line => {
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        // Dessiner les lignes
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + Math.cos(line.angle) * line.length, line.y + Math.sin(line.angle) * line.length);
        ctx.strokeStyle = `rgba(0, 255, 0, ${line.opacity})`; // Lignes vertes pour simuler des flux
        ctx.lineWidth = 2;
        ctx.stroke();

        // Réinitialiser la position si la ligne sort de l'écran
        if (line.x > canvas.width || line.x < 0 || line.y > canvas.height || line.y < 0) {
            line.x = Math.random() * canvas.width;
            line.y = Math.random() * canvas.height;
        }
    });
}

// Fonction pour dessiner des particules (représentant des paquets de données ou des éléments d'audit)
function drawParticles() {
    const particles = [];
    for (let i = 0; i < 10; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: 'rgba(0, 255, 0, 0.7)',
            life: 100
        });
    }

    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Déplacement des particules
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 1;

        // Réinitialisation de la particule si elle meurt
        if (particle.life <= 0) {
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
            particle.life = 100;
        }
    });
}

// Fonction d'animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer l'écran à chaque frame

    // Dessiner les lignes de données et les particules
    drawLines();
    drawParticles();

    requestAnimationFrame(animate); // Crée un loop d'animation
}

animate(); // Lancer l'animation
