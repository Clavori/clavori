document.addEventListener("DOMContentLoaded", () => {
    // ---- Typewriter Effect ----
    const titleElement = document.getElementById('typewriter-title');
    if (titleElement) {
        // The text we want to type, including HTML for the break and neon glow
        const textHTML = "Transformo ideias em <br> <span class='neon-text'>negócios digitais</span>";
        let index = 0;
        let isTag = false;
        
        // Start with empty content plus caret
        titleElement.innerHTML = '<span class="typewriter-caret"></span>';
        
        function typeWriter() {
            if (index < textHTML.length) {
                // If it's starting an HTML tag, skip instantly until the tag ends
                if (textHTML.charAt(index) === '<') isTag = true;
                if (textHTML.charAt(index) === '>') isTag = false;
                
                // Set the innerHTML up to the current index, and append the caret
                titleElement.innerHTML = textHTML.substring(0, index + 1) + '<span class="typewriter-caret"></span>';
                index++;
                
                // If typing a tag, zero delay. If typing text, typical typewriter delay
                let delay = isTag ? 0 : 40 + Math.random() * 40; 
                setTimeout(typeWriter, delay);
            }
        }
        
        // Inicia a digitação após 800ms
        setTimeout(typeWriter, 800);
    }

    // ---- Efeitos de Hover e Scroll Revelação ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // ---- Partículas Flutuantes na Hero ----
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;
        
        // Rastreamento do Mouse
        let mouse = { x: null, y: null };
        const maxDistance = 150; // Área de atração do mouse
        
        window.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            // Pegamos a altura da hero para garantir que as partículas cubram o container
            canvas.height = document.querySelector('.hero').offsetHeight || window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1; // entre 1 e 3
                this.baseSpeedX = Math.random() * 0.8 - 0.4;
                this.baseSpeedY = Math.random() * 0.8 - 0.4;
                this.speedX = this.baseSpeedX;
                this.speedY = this.baseSpeedY;
                // Cores solicitadas (Ciano e Azul)
                this.color = Math.random() > 0.5 ? '#00e5ff' : '#2979ff';
                this.opacity = Math.random() * 0.6 + 0.2; 
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let pullX = 0;
                let pullY = 0;
                
                // Se o mouse estiver perto, cria uma força de atração
                if (mouse.x != null && mouse.y != null && distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    pullX = (dx / distance) * force * 1.5;
                    pullY = (dy / distance) * force * 1.5;
                }
                
                // As partículas tentam voltar à velocidade original suavemente (atrito suave)
                this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
                this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
                
                this.x += this.speedX + pullX;
                this.y += this.speedY + pullY;

                // Bouncing (rebater nas bordas)
                if (this.x > canvas.width || this.x < 0) {
                    this.baseSpeedX *= -1;
                    this.speedX *= -1;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.baseSpeedY *= -1;
                    this.speedY *= -1;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                
                // Brilho Neon na partícula
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.globalAlpha = this.opacity;
                
                ctx.fill();
                
                // Resetando estilo
                ctx.shadowBlur = 0; 
                ctx.globalAlpha = 1.0;
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }
});
