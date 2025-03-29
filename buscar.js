document.addEventListener('DOMContentLoaded', function() {
    // Manejar botones de agregar al carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            addToCart(productId, 1);
        });
    });

    // Manejar botones de favoritos
    const favoriteButtons = document.querySelectorAll('.add-to-favorites-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            toggleFavorite(productId);
            this.classList.toggle('active');
            
            // Cambiar el ícono
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // Función para agregar al carrito
    function addToCart(productId, quantity) {
        // Aquí puedes usar fetch para enviar una solicitud AJAX al servidor
        fetch('agregar_carrito.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}&quantity=${quantity}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mostrar notificación de éxito
                showNotification('Producto agregado al carrito', 'success');
                
                // Actualizar contador del carrito
                updateCartCount(data.cartCount);
            } else {
                showNotification('Error al agregar el producto', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Ocurrió un error', 'error');
        });
    }

    // Función para alternar favoritos
    function toggleFavorite(productId) {
        // Aquí puedes usar fetch para enviar una solicitud AJAX al servidor
        fetch('toggle_favorito.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `product_id=${productId}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Mostrar notificación de éxito
                if (data.added) {
                    showNotification('Producto agregado a favoritos', 'success');
                } else {
                    showNotification('Producto eliminado de favoritos', 'info');
                }
                
                // Actualizar contador de favoritos
                updateFavoritesCount(data.favoritesCount);
            } else {
                showNotification('Error al actualizar favoritos', 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Ocurrió un error', 'error');
        });
    }

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Función para actualizar contador del carrito
    function updateCartCount(count) {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    // Función para actualizar contador de favoritos
    function updateFavoritesCount(count) {
        const favoritesCountElement = document.getElementById('favorites-count');
        if (favoritesCountElement) {
            favoritesCountElement.textContent = count;
        }
    }
});