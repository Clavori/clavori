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

});
