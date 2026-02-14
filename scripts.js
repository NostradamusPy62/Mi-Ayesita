
const btnVerCarta = document.getElementById('btnVerCarta');
const mensaje = document.getElementById('mensaje');
const btnAbrirCompleta = document.getElementById('btnAbrirCompleta');
const cartaCompleta = document.getElementById('cartaCompleta');
const corazonesContainer = document.getElementById('corazones');
const canvas = document.getElementById('canvasMargaritas');
const ctx = canvas.getContext('2d');

btnVerCarta.addEventListener('click', () => {
    mensaje.classList.add('mostrar');
    btnAbrirCompleta.style.display = 'inline-block';
    crearCorazones();
});

btnAbrirCompleta.addEventListener('click', () => {
    cartaCompleta.style.display = 'block';
    ajustarCanvas();
    animarMargaritas();
});

function crearCorazones() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.classList.add('corazon');
            corazon.textContent = '❤️';
            corazon.style.left = Math.random() * 100 + '%';
            corazon.style.animationDuration = (Math.random() * 2 + 3) + 's';
            corazon.style.animationDelay = Math.random() * 2 + 's';
            corazonesContainer.appendChild(corazon);

            setTimeout(() => {
                corazon.remove();
            }, 6000);
        }, i * 200);
    }
}

function ajustarCanvas() {
    canvas.width = cartaCompleta.offsetWidth;
    canvas.height = cartaCompleta.offsetHeight;
}

window.addEventListener('resize', ajustarCanvas);

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

class Margarita {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamano = 0;
        this.tamanoFinal = Math.random() * 40 + 30;
        this.velocidadCrecimiento = Math.random() * 0.5 + 0.3;
        this.petalos = 8;
        this.rotacion = Math.random() * Math.PI * 2;

        const colores = ['#fff', '#000', '#ff007f', '#8B0000'];
        this.color = colores[Math.floor(Math.random() * colores.length)];
        this.rgb = hexToRgb(this.color);
        this.alpha = 0;
        this.alphaTarget = Math.random() * 0.3 + 0.4;
    }

    crecer() {
        if (this.tamano < this.tamanoFinal) {
            this.tamano += this.velocidadCrecimiento;
        }
        if (this.alpha < this.alphaTarget) {
            this.alpha += 0.01;
        }
    }

    dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotacion);
        ctx.globalAlpha = this.alpha;

        for (let i = 0; i < this.petalos; i++) {
            ctx.save();
            ctx.rotate((Math.PI * 2 * i) / this.petalos);
            ctx.beginPath();
            ctx.ellipse(this.tamano * 0.4, 0, this.tamano * 0.3, this.tamano * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0, 0, this.tamano * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#FFD700';
        ctx.fill();

        ctx.restore();
    }
}

let margaritas = [];
const maxMargaritas = 15;

function inicializarMargaritas() {
    for (let i = 0; i < maxMargaritas; i++) {
        setTimeout(() => {
            margaritas.push(new Margarita());
        }, i * 300);
    }
}

function animarMargaritas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    margaritas.forEach(margarita => {
        margarita.crecer();
        margarita.dibujar();
    });

    requestAnimationFrame(animarMargaritas);
}

inicializarMargaritas();