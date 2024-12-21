const surpriseBtn = document.getElementById('surpriseBtn');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor() {
    return `hsl(${Math.random() * 360}, 100%, 70%)`;
}

function createFirework(x, y) {
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 5 + 2,
            color: randomColor(),
            alpha: 1,
        });
    }
    return particles;
}

let fireworks = [];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.forEach((particle, i) => {
            particle.x += Math.cos(particle.angle) * particle.speed;
            particle.y += Math.sin(particle.angle) * particle.speed;
            particle.alpha -= 0.02;

            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
            ctx.fill();

            if (particle.alpha <= 0) firework.splice(i, 1);
        });

        if (firework.length === 0) fireworks.splice(index, 1);
    });

    requestAnimationFrame(draw);
}

surpriseBtn.addEventListener('click', () => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    fireworks.push(createFirework(x, y));
});

draw();
