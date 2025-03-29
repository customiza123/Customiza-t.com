document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".swiper-slide");
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    let currentIndex = 0;
    let autoSlideInterval;

    // Crear botones dinámicamente
    prevButton.classList.add("prev-button", "prev");
    prevButton.innerHTML = "<"; // Flecha izquierda
    nextButton.classList.add("next-button", "next");
    nextButton.innerHTML = ">"; // Flecha derecha

    document.querySelector(".swiper").appendChild(prevButton);
    document.querySelector(".swiper").appendChild(nextButton);

    function updateSlide() {
        const offset = -currentIndex * 100;
        swiperWrapper.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 10000); // 10 segundos por imagen
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Eventos de los botones
    nextButton.addEventListener("click", () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    // Iniciar el carrusel automático
    startAutoSlide();
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('slider');
    const afterImage = document.getElementById('afterImage');
    const sliderLine = document.getElementById('sliderLine');
    const wrapper = document.getElementById('wrapper1');
    
    // Ajustar la posición inicial del divisor y la imagen "después"
    function setInitialPosition() {
        const wrapperWidth = wrapper.offsetWidth;
        const value = slider.value;
        const position = (value * wrapperWidth) / 100;
        
        // Modificado: ahora controlamos el clip-path en lugar del ancho
        afterImage.style.clipPath = `inset(0 ${wrapperWidth - position}px 0 0)`;
        sliderLine.style.left = position + 'px';
    }
    
    // Actualizar la posición cuando se mueve el slider
    function updatePosition() {
        const wrapperWidth = wrapper.offsetWidth;
        const value = slider.value;
        const position = (value * wrapperWidth) / 100;
        
        // Modificado: ahora controlamos el clip-path en lugar del ancho
        afterImage.style.clipPath = `inset(0 ${wrapperWidth - position}px 0 0)`;
        sliderLine.style.left = position + 'px';
    }
    
    // Manejar el evento de arrastre del slider
    slider.addEventListener('input', updatePosition);
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', setInitialPosition);
    
    // Establecer posición inicial
    setInitialPosition();
    
    // Permitir arrastrar directamente la línea del slider
    sliderLine.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', stopDrag);
    
    let isDragging = false;
    
    function startDrag(e) {
        isDragging = true;
        document.addEventListener('mousemove', drag);
        e.preventDefault(); // Prevenir selección de texto
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
    }
    
    function drag(e) {
        if (isDragging) {
            const rect = wrapper.getBoundingClientRect();
            const wrapperWidth = wrapper.offsetWidth;
            
            // Calcular posición relativa al contenedor
            let position = e.clientX - rect.left;
            
            // Limitar dentro del contenedor
            if (position < 0) position = 0;
            if (position > wrapperWidth) position = wrapperWidth;
            
            // Convertir a porcentaje para el slider
            const percentage = (position / wrapperWidth) * 100;
            
            // Actualizar slider
            slider.value = percentage;
            
            // Modificado: actualizar clip-path en lugar del ancho
            afterImage.style.clipPath = `inset(0 ${wrapperWidth - position}px 0 0)`;
            sliderLine.style.left = position + 'px';
        }
    }
    
    // Soporte táctil para dispositivos móviles
    sliderLine.addEventListener('touchstart', startTouchDrag);
    document.addEventListener('touchend', stopTouchDrag);
    
    function startTouchDrag(e) {
        isDragging = true;
        document.addEventListener('touchmove', touchDrag);
        e.preventDefault();
    }
    
    function stopTouchDrag() {
        isDragging = false;
        document.removeEventListener('touchmove', touchDrag);
    }
    
    function touchDrag(e) {
        if (isDragging && e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = wrapper.getBoundingClientRect();
            const wrapperWidth = wrapper.offsetWidth;
            
            let position = touch.clientX - rect.left;
            
            if (position < 0) position = 0;
            if (position > wrapperWidth) position = wrapperWidth;
            
            const percentage = (position / wrapperWidth) * 100;
            
            slider.value = percentage;
            // Modificado: actualizar clip-path en lugar del ancho
            afterImage.style.clipPath = `inset(0 ${wrapperWidth - position}px 0 0)`;
            sliderLine.style.left = position + 'px';
        }
    }
});

// Footer //

document.addEventListener('DOMContentLoaded', function() {
    // Efecto parallax suave para el footer
    const footer = document.querySelector('.footer');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;
        
        // Solo aplicar el efecto cuando nos acercamos al footer
        if (scrollPosition + windowHeight > documentHeight - 300) {
            const distance = (scrollPosition + windowHeight) - (documentHeight - 300);
            const parallaxValue = Math.min(distance / 5, 20);
            
            footer.style.backgroundPositionY = `-${parallaxValue}px`;
        }
    });
    
    // Animación para el mensaje de copyright
    const copyright = document.querySelector('.copyright');
    let isAnimating = false;
    
    copyright.addEventListener('mouseenter', function() {
        if (!isAnimating) {
            isAnimating = true;
            animateCopyright();
        }
    });
    
    function animateCopyright() {
        copyright.style.transition = 'transform 0.3s ease-in-out';
        copyright.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            copyright.style.transform = 'scale(1)';
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        }, 300);
    }
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateEmail(emailInput.value)) {
            // Success animation
            emailInput.style.borderColor = '#4CAF50';
            
            // Reset after delay
            setTimeout(() => {
                emailInput.value = '';
                emailInput.style.borderColor = '';
                alert('¡Gracias por suscribirte a nuestro newsletter!');
            }, 1000);
        } else {
            // Error animation
            emailInput.style.borderColor = '#ff4d4d';
            emailInput.classList.add('shake');
            
            setTimeout(() => {
                emailInput.classList.remove('shake');
            }, 500);
        }
    });
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Añadir la clase shake para la animación de error
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
    `;
    document.head.appendChild(style);
});


document.addEventListener('DOMContentLoaded', function() {
    // Asignar el evento al botón manualmente
    const registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            openModal('registerModal');
        });
    }
});


