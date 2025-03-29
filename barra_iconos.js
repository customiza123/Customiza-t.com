(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // ===== Funcionalidad de mostrar/ocultar paneles desplegables =====
        const iconContainers = document.querySelectorAll('.icon-container');
        
        // Función para cerrar todos los paneles
        function closeAllPanels() {
            iconContainers.forEach(container => {
                container.classList.remove('active');
            });
        }
        
        // Añadir event listener para cada icono
        iconContainers.forEach(container => {
            container.addEventListener('click', function(e) {
                e.stopPropagation(); // Evitar que el clic se propague
                
                // Si ya está activo, lo desactivamos
                if (container.classList.contains('active')) {
                    container.classList.remove('active');
                } else {
                    // Cerrar todos los paneles primero
                    closeAllPanels();
                    // Activar este panel
                    container.classList.add('active');
                }
            });
        });
        
        // Cerrar paneles al hacer clic en cualquier parte del documento
        document.addEventListener('click', function() {
            closeAllPanels();
        });
        
        // Evitar que los clics dentro de los paneles cierren el panel
        const dropdownPanels = document.querySelectorAll('.dropdown-panel');
        dropdownPanels.forEach(panel => {
            panel.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
        
        // ===== Cargar datos de búsquedas recientes =====
        const recentSearchesList = document.getElementById('recent-searches-list');
        
        // Simulando datos que vendrían de la base de datos
        const recentSearches = [
            'playera negra',
            'sudadera con logo',
            'gorra deportiva'
        ];
        
        // Llenar la lista de búsquedas recientes
        if (recentSearchesList) {
            recentSearchesList.innerHTML = '';
            recentSearches.forEach(term => {
                const li = document.createElement('li');
                li.textContent = term;
                li.addEventListener('click', function() {
                    document.getElementById('search-input').value = term;
                });
                recentSearchesList.appendChild(li);
            });
        }
        
        // ===== Cargar datos de favoritos =====
        const favoritesList = document.getElementById('favorites-list');
        const favoritesCount = document.getElementById('favorites-count');
        
        // Simulando datos que vendrían de la base de datos
        const favorites = [
            { id: 1, name: 'Gorra Premium', price: 200.00, image: 'images/products/gorra_premium.jpg' },
            { id: 2, name: 'Sudadera con Capucha', price: 350.00, image: 'images/products/sudadera_capucha.jpg' }
        ];
        
        // Actualizar contador de favoritos
        if (favoritesCount) {
            favoritesCount.textContent = favorites.length;
        }
        
        // Llenar la lista de favoritos
        if (favoritesList) {
            favoritesList.innerHTML = '';
            
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<p class="empty-message">No tienes favoritos</p>';
            } else {
                favorites.forEach(item => {
                    const favoriteItem = document.createElement('div');
                    favoriteItem.className = 'favorite-item';
                    favoriteItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="favorite-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)}</p>
                        </div>
                        <span class="remove-favorite" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </span>
                    `;
                    favoritesList.appendChild(favoriteItem);
                });
                
                // Añadir event listener para eliminar favoritos
                document.querySelectorAll('.remove-favorite').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        // Aquí iría la llamada AJAX para eliminar el favorito
                        console.log('Eliminar favorito con id:', id);
                        this.closest('.favorite-item').remove();
                        
                        // Actualizar contador
                        const currentCount = parseInt(favoritesCount.textContent);
                        favoritesCount.textContent = currentCount - 1;
                    });
                });
            }
        }
        
        // ===== Cargar datos del carrito =====
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotalAmount = document.getElementById('cart-total-amount');
        
        // Simulando datos que vendrían de la base de datos
        const cartProducts = [
            { id: 1, name: 'Playera Básica', price: 120.00, quantity: 2, size: 'M', design: 'Diseño 25', image: 'images/products/playera_basica.jpg' }
        ];
        
        // Actualizar contador del carrito
        if (cartCount) {
            const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Llenar el carrito
        if (cartItems) {
            cartItems.innerHTML = '';
            
            if (cartProducts.length === 0) {
                cartItems.innerHTML = '<p class="empty-message">Tu carrito está vacío</p>';
                if (cartTotalAmount) cartTotalAmount.textContent = '$0.00';
            } else {
                let total = 0;
                
                cartProducts.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>Talla: ${item.size} | Diseño: ${item.design}</p>
                            <p>$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="cart-quantity">
                            <button class="quantity-decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-increase" data-id="${item.id}">+</button>
                        </div>
                    `;
                    cartItems.appendChild(cartItem);
                });
                
                // Actualizar total
                if (cartTotalAmount) {
                    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
                }
                
                // Añadir event listeners para incrementar/decrementar cantidades
                document.querySelectorAll('.quantity-decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        // Aquí iría la llamada AJAX para actualizar el carrito
                        console.log('Disminuir cantidad del producto con id:', id);
                    });
                });
                
                document.querySelectorAll('.quantity-increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const id = this.getAttribute('data-id');
                        // Aquí iría la llamada AJAX para actualizar el carrito
                        console.log('Aumentar cantidad del producto con id:', id);
                    });
                });
            }
        }
        
        // ===== Funcionalidad de login/logout =====
        // Simular un usuario no logueado inicialmente
        let isLoggedIn = false;
        const userNotLogged = document.getElementById('user-not-logged');
        const userLogged = document.getElementById('user-logged');
        const userName = document.getElementById('user-name');
        
        // Botones de login y logout
        const loginButton = document.getElementById('login-button');
        const logoutButton = document.getElementById('logout-button');
        
        if (loginButton) {
            loginButton.addEventListener('click', function() {
                // Aquí iría la redirección al formulario de login o una ventana modal
                console.log('Redireccionar a login');
                
                // Para propósitos de demostración, simulamos un login exitoso
                isLoggedIn = true;
                updateUserInterface();
            });
        }
        
        if (logoutButton) {
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                // Aquí iría la lógica de logout
                console.log('Cerrar sesión');
                
                isLoggedIn = false;
                updateUserInterface();
            });
        }
        
        // Función para actualizar la interfaz según el estado de login
        function updateUserInterface() {
            if (isLoggedIn) {
                if (userNotLogged) userNotLogged.style.display = 'none';
                if (userLogged) userLogged.style.display = 'block';
                if (userName) userName.textContent = 'Usuario';
            } else {
                if (userNotLogged) userNotLogged.style.display = 'block';
                if (userLogged) userLogged.style.display = 'none';
            }
        }
        
        // Inicializar la interfaz
        updateUserInterface();
        
        // ===== Funcionalidad de búsqueda =====
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    // Aquí iría la redirección a la página de resultados
                    console.log('Buscar:', searchTerm);
                    window.location.href = `resultados.html?q=${encodeURIComponent(searchTerm)}`;
                }
            });
        }
        
        // Permitir búsqueda al presionar Enter
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const searchTerm = searchInput.value.trim();
                    if (searchTerm) {
                        console.log('Buscar:', searchTerm);
                        window.location.href = `resultados.html?q=${encodeURIComponent(searchTerm)}`;
                    }
                }
            });
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    // Gestionar los paneles desplegables
    const iconContainers = document.querySelectorAll('.icon-container');
    
    iconContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            // Evitar que el clic se propague a document (para el manejo de cierre)
            e.stopPropagation();
            
            const panel = this.querySelector('.dropdown-panel');
            
            // Cerrar todos los demás paneles abiertos
            document.querySelectorAll('.dropdown-panel.open').forEach(openPanel => {
                if (openPanel !== panel) {
                    openPanel.classList.remove('open');
                }
            });
            
            // Alternar el panel actual
            panel.classList.toggle('open');
        });
    });
    
    // Cerrar paneles al hacer clic fuera de ellos
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-panel.open').forEach(panel => {
            panel.classList.remove('open');
        });
    });
    
    // Evitar que el clic dentro de los paneles los cierre
    document.querySelectorAll('.dropdown-panel').forEach(panel => {
        panel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const recentSearchesList = document.getElementById('recent-searches-list');
    
    // Cargar búsquedas recientes al iniciar
    loadRecentSearches();
    
    // Manejar envío del formulario de búsqueda
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function(e) {
            if (searchInput.value.trim() !== '') {
                // Redirigir a la página de búsqueda
                window.location.href = `busqueda.php?q=${encodeURIComponent(searchInput.value.trim())}`;
                
                // Guardar la búsqueda reciente
                saveRecentSearch(searchInput.value.trim());
            }
        });
        
        // También permitir enviar la búsqueda con Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (searchInput.value.trim() !== '') {
                    window.location.href = `busqueda.php?q=${encodeURIComponent(searchInput.value.trim())}`;
                    saveRecentSearch(searchInput.value.trim());
                }
            }
        });
    }
    
    // Funciones para manejar las búsquedas recientes
    function saveRecentSearch(searchTerm) {
        // Obtener búsquedas guardadas
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        
        // Evitar duplicados
        if (!recentSearches.includes(searchTerm)) {
            // Agregar nueva búsqueda al inicio
            recentSearches.unshift(searchTerm);
            
            // Limitar a 5 búsquedas recientes
            if (recentSearches.length > 5) {
                recentSearches = recentSearches.slice(0, 5);
            }
            
            // Guardar en localStorage
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            
            // Actualizar la lista mostrada
            loadRecentSearches();
        }
    }
    
    function loadRecentSearches() {
        if (!recentSearchesList) return;
        
        // Limpiar lista actual
        recentSearchesList.innerHTML = '';
        
        // Obtener búsquedas guardadas
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        
        // Mostrar mensaje si no hay búsquedas
        if (recentSearches.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = 'No hay búsquedas recientes';
            emptyItem.className = 'empty-searches';
            recentSearchesList.appendChild(emptyItem);
            return;
        }
        
        // Crear elementos para cada búsqueda
        recentSearches.forEach(search => {
            const li = document.createElement('li');
            li.className = 'recent-search-item';
            
            const searchLink = document.createElement('a');
            searchLink.href = `busqueda.php?q=${encodeURIComponent(search)}`;
            searchLink.textContent = search;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-search';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.setAttribute('aria-label', 'Eliminar búsqueda');
            deleteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                removeRecentSearch(search);
            });
            
            li.appendChild(searchLink);
            li.appendChild(deleteBtn);
            recentSearchesList.appendChild(li);
        });
    }
    
    function removeRecentSearch(searchTerm) {
        // Obtener búsquedas guardadas
        let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        
        // Eliminar la búsqueda
        recentSearches = recentSearches.filter(item => item !== searchTerm);
        
        // Guardar en localStorage
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        
        // Actualizar la lista mostrada
        loadRecentSearches();
    }
    
    // Configurar botón para limpiar todas las búsquedas recientes
    const clearSearchesBtn = document.getElementById('clear-searches');
    if (clearSearchesBtn) {
        clearSearchesBtn.addEventListener('click', function() {
            localStorage.removeItem('recentSearches');
            loadRecentSearches();
        });
    }
    
    // Conexión con la base de datos para las funciones de usuario
    function checkLoginStatus() {
        fetch('check_login.php')
            .then(response => response.json())
            .then(data => {
                const userPanel = document.getElementById('user-panel');
                if (userPanel) {
                    if (data.loggedIn) {
                        // Usuario conectado
                        userPanel.innerHTML = `
                            <div class="user-info">
                                <span class="username">${data.username}</span>
                                <a href="perfil.php" class="profile-link">Mi perfil</a>
                                <a href="mis_pedidos.php" class="orders-link">Mis pedidos</a>
                                <a href="logout.php" class="logout-btn">Cerrar sesión</a>
                            </div>
                        `;
                    } else {
                        // Usuario no conectado
                        userPanel.innerHTML = `
                            <div class="login-options">
                                <a href="login.php" class="login-btn">Iniciar sesión</a>
                                <a href="registro.php" class="register-btn">Registrarse</a>
                            </div>
                        `;
                    }
                }
            })
            .catch(error => console.error('Error al verificar estado de sesión:', error));
    }
    
    // Verificar estado de inicio de sesión al cargar la página
    checkLoginStatus();
});

