const earth = document.querySelector('.earth');
const moon = document.querySelector('.moon');

let angle = 0;

function animateMoon() {
    angle += 0.25; // Kecepatan rotasi bulan
    const x = 100 * Math.cos(angle * (Math.PI / 180));
    const y = 100 * Math.sin(angle * (Math.PI / 180));

    moon.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animateMoon);
}

animateMoon();
