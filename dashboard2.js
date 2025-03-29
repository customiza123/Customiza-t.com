document.addEventListener('DOMContentLoaded', function() {
    // Función para alternar el modo oscuro
    const modoOscuroBtn = document.querySelector('[href="#modo-oscuro"]');
    if (modoOscuroBtn) {
        modoOscuroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('dark-mode');
            // Guardar preferencia en localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('tema', 'oscuro');
            } else {
                localStorage.setItem('tema', 'claro');
            }
        });
    }

    // Verificar si hay una preferencia guardada
    if (localStorage.getItem('tema') === 'oscuro') {
        document.body.classList.add('dark-mode');
    }

    // Mejora de interactividad para tablas
    const tablas = document.querySelectorAll('table');
    tablas.forEach(tabla => {
        // Añadir clase para estilos
        if (!tabla.classList.contains('listado-table')) {
            tabla.classList.add('listado-table');
        }
    });

    // Mejora de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (!form.closest('.search-container')) {
            const container = form.closest('div');
            if (container && !container.classList.contains('form-section')) {
                container.classList.add('form-section');
            }
        }
        
        // Mejorar inputs
        const inputs = form.querySelectorAll('input:not([type="submit"]):not([type="button"])');
        inputs.forEach(input => {
            if (!input.classList.contains('form-control')) {
                input.classList.add('form-control');
            }
        });
        
        // Mejorar textareas
        const textareas = form.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            if (!textarea.classList.contains('form-control')) {
                textarea.classList.add('form-control');
            }
        });
        
        // Mejorar selects
        const selects = form.querySelectorAll('select');
        selects.forEach(select => {
            if (!select.classList.contains('form-control')) {
                select.classList.add('form-control');
            }
        });
        
        // Mejorar botones
        const buttons = form.querySelectorAll('input[type="submit"], input[type="button"], button');
        buttons.forEach(button => {
            if (!button.classList.contains('btn')) {
                button.classList.add('btn', 'btn-primary');
            }
        });
    });

    // Crear contenedores para búsquedas si no existen
    const searchInputs = document.querySelectorAll('input[placeholder*="Buscar"]');
    searchInputs.forEach(input => {
        const container = input.closest('div');
        if (container && !container.classList.contains('search-container')) {
            container.classList.add('search-container');
        }
    });

    // Mejora para fechas
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.classList.add('form-control');
    });
    
    // Añadir animaciones a las tarjetas
    const cards = document.querySelectorAll('.card, .order-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Función para formatear números en las estadísticas
    function formatearNumeros() {
        const numeros = document.querySelectorAll('.card');
        numeros.forEach(card => {
            const valor = card.querySelector('div');
            if (valor && !isNaN(valor.textContent.trim())) {
                // Si es número, formatear con separador de miles
                const num = parseInt(valor.textContent.trim());
                if (num > 999) {
                    valor.textContent = num.toLocaleString();
                }
            }
        });
    }
    
    formatearNumeros();
});