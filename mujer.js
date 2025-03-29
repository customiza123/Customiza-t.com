// Importar GSAP para animaciones suaves
import { gsap } from "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.collection-card');
    
    // Animación inicial de las cards
    gsap.from(cards, {
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Efecto de parallax en las imágenes
    cards.forEach(card => {
        const img = card.querySelector('img');
        const info = card.querySelector('.collection-info');
        const arrow = card.querySelector('.arrow');

        // Efecto de mouse parallax
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;

            gsap.to(img, {
                duration: 0.5,
                x: (x - 0.5) * 20,
                y: (y - 0.5) * 20,
                ease: "power2.out"
            });

            gsap.to(info, {
                duration: 0.5,
                x: (x - 0.5) * 10,
                y: (y - 0.5) * 10,
                ease: "power2.out"
            });
        });

        // Reset position on mouse leave
        card.addEventListener('mouseleave', () => {
            gsap.to([img, info], {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: "power2.out"
            });
        });

        // Efecto de hover
        card.addEventListener('mouseenter', () => {
            gsap.to(arrow, {
                duration: 0.3,
                x: 0,
                opacity: 1,
                ease: "power2.out"
            });

            gsap.to(info, {
                duration: 0.3,
                y: -5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(arrow, {
                duration: 0.3,
                x: -20,
                opacity: 0,
                ease: "power2.in"
            });

            gsap.to(info, {
                duration: 0.3,
                y: 0,
                ease: "power2.in"
            });
        });
    });

    // Efecto de desplazamiento suave al hacer clic
    cards.forEach(card => {
        card.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: card,
                    offsetY: 50
                },
                ease: "power2.inOut"
            });
            
            // Efecto de pulsación al hacer clic
            gsap.to(card, {
                duration: 0.1,
                scale: 0.95,
                ease: "power2.in",
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    duration: 0.5,
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out"
                });
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
        // Estado inicial
        gsap.set(card, {
            scale: 0.9,
            opacity: 0,
            y: 30
        });
    });
});

// Efecto de cursor personalizado
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power2.out"
    });
});

// Actualizar cursor en hover
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            duration: 0.3,
            scale: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            duration: 0.3,
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            ease: "power2.in"
        });
    });
});