// Variables globales
let cartItems = [];
let subtotal = 0;
let shippingCost = 50;
let discountAmount = 0;
let totalAmount = 0;

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const cartItemsList = document.getElementById('cart-items-list');
    const cartItemsMini = document.getElementById('cart-items-mini');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const shippingCostElem = document.getElementById('shipping-cost');
    const discountContainer = document.getElementById('discount-container');
    const discountAmountElem = document.getElementById('discount-amount');
    const cartTotal = document.getElementById('cart-total');
    const cartTotalAmountMini = document.getElementById('cart-total-amount');
    const cartCountBadge = document.getElementById('cart-count');
    const couponInput = document.getElementById('coupon-code');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const proceedCheckoutBtn = document.getElementById('proceed-checkout');
    
    // Cargar los productos del carrito desde la base de datos
    loadCartItems();
    
    // Event listeners
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', applyCoupon);
    }
    
    if (proceedCheckoutBtn) {
        proceedCheckoutBtn.addEventListener('click', proceedToCheckout);
    }
    
    // Función para cargar los productos del carrito desde la base de datos
    function loadCartItems() {
        // Obtener el ID del usuario actualmente logueado (o del carrito de sesión)
        const userId = getUserId();
        
        // Usar AJAX para obtener los elementos del carrito desde PHP
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'get_cart_items.php?userId=' + userId, true);
        
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);
                    
                    if (response.success) {
                        cartItems = response.items;
                        
                        // Actualizar la interfaz con los productos
                        renderCartItems();
                        calculateTotals();
                        updateCartCount();
                    } else {
                        console.error('Error al cargar el carrito:', response.message);
                        showEmptyCart();
                    }
                } catch (e) {
                    console.error('Error al parsear la respuesta:', e);
                    showEmptyCart();
                }
            } else {
                console.error('Error en la solicitud AJAX:', this.status);
                showEmptyCart();
            }
        };
        
        xhr.onerror = function() {
            console.error('Error de red en la solicitud AJAX');
            showEmptyCart();
        };
        
        xhr.send();
    }
    
    // Función para obtener el ID del usuario actual
    function getUserId() {
        // Si hay un usuario logueado, obtener su ID desde una cookie o sessionStorage
        const loggedUserId = sessionStorage.getItem('userId');
        
        if (loggedUserId) {
            return loggedUserId;
        }
        
        // Si no hay usuario logueado, usar el ID de carrito de sesión
        let sessionCartId = sessionStorage.getItem('sessionCartId');
        
        if (!sessionCartId) {
            // Generar un ID de carrito de sesión aleatorio si no existe
            sessionCartId = 'guest_' + Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('sessionCartId', sessionCartId);
        }
        
        return sessionCartId;
    }
    
    // Función para mostrar los productos en el carrito
    function renderCartItems() {
        // Limpiar el contenedor
        if (cartItemsList) {
            cartItemsList.innerHTML = '';
        }
        
        if (cartItemsMini) {
            cartItemsMini.innerHTML = '';
        }
        
        if (cartItems.length === 0) {
            showEmptyCart();
            return;
        }
        
        // Ocultar el mensaje de carrito vacío
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';
        }
        
        // Recorrer cada producto y agregarlo a la interfaz
        cartItems.forEach(item => {
            // Agregar a la vista completa del carrito
            if (cartItemsList) {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="product-info">
                        <img src="${item.imagen}" alt="${item.nombre}" class="product-image">
                        <div class="product-details">
                            <h3>${item.nombre}</h3>
                            <p>${item.color || ''} ${item.talla ? '/ Talla: ' + item.talla : ''}</p>
                        </div>
                    </div>
                    <div class="product-price">$${parseFloat(item.precio).toFixed(2)}</div>
                    <div class="quantity-control">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <input type="number" min="1" value="${item.cantidad}" class="quantity-input" data-id="${item.id}">
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <div class="product-subtotal">$${(parseFloat(item.precio) * parseInt(item.cantidad)).toFixed(2)}</div>
                    <div class="action-buttons">
                        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                        <button class="save-for-later" data-id="${item.id}"><i class="fas fa-heart"></i></button>
                    </div>
                `;
                cartItemsList.appendChild(cartItemElement);
                
                // Agregar event listeners para los botones de cantidad
                const decreaseBtn = cartItemElement.querySelector(`.decrease-btn[data-id="${item.id}"]`);
                const increaseBtn = cartItemElement.querySelector(`.increase-btn[data-id="${item.id}"]`);
                const quantityInput = cartItemElement.querySelector(`.quantity-input[data-id="${item.id}"]`);
                const removeBtn = cartItemElement.querySelector(`.remove-item[data-id="${item.id}"]`);
                const saveForLaterBtn = cartItemElement.querySelector(`.save-for-later[data-id="${item.id}"]`);
                
                decreaseBtn.addEventListener('click', () => updateQuantity(item.id, Math.max(1, parseInt(quantityInput.value) - 1)));
                increaseBtn.addEventListener('click', () => updateQuantity(item.id, parseInt(quantityInput.value) + 1));
                quantityInput.addEventListener('change', () => updateQuantity(item.id, Math.max(1, parseInt(quantityInput.value))));
                removeBtn.addEventListener('click', () => removeFromCart(item.id));
                saveForLaterBtn.addEventListener('click', () => saveForLater(item.id));
            }
            
            // Agregar a la vista miniatura del dropdown
            if (cartItemsMini) {
                const miniItemElement = document.createElement('div');
                miniItemElement.className = 'cart-mini-item';
                miniItemElement.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="cart-mini-item-details">
                        <h4 class="cart-mini-item-name">${item.nombre}</h4>
                        <p class="cart-mini-item-price">$${parseFloat(item.precio).toFixed(2)} <span class="cart-mini-item-quantity">x ${item.cantidad}</span></p>
                    </div>
                    <div class="cart-mini-item-remove" data-id="${item.id}"><i class="fas fa-times"></i></div>
                `;
                cartItemsMini.appendChild(miniItemElement);
                
                // Agregar event listener para el botón de eliminar
                const miniRemoveBtn = miniItemElement.querySelector(`.cart-mini-item-remove[data-id="${item.id}"]`);
                miniRemoveBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Evitar que el clic cierre el dropdown
                    removeFromCart(item.id);
                });
            }
        });
    }
    
    // Función para mostrar el mensaje de carrito vacío
    function showEmptyCart() {
        if (cartItemsList) {
            if (emptyCartMessage) {
                emptyCartMessage.style.display = 'block';
                cartItemsList.appendChild(emptyCartMessage);
            } else {
                cartItemsList.innerHTML = `
                    <div class="cart-empty-message">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Tu carrito está vacío</p>
                        <a href="pagina_principal.html" class="continue-shopping">Seguir comprando</a>
                    </div>
                `;
            }
        }
        
        if (cartItemsMini) {
            cartItemsMini.innerHTML = `
                <div class="cart-mini-empty">
                    <p>No hay productos en tu carrito</p>
                </div>
            `;
        }
        
        // Actualizar totales a cero
        updateTotals(0, 0, 0);
    }
    
    // Función para actualizar la cantidad de un producto
    function updateQuantity(itemId, newQuantity) {
        const userId = getUserId();
        
        // Actualizar en la base de datos usando AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_cart_item.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);
                    
                    if (response.success) {
                        // Actualizar el array local de items
                        cartItems = cartItems.map(item => {
                            if (item.id === itemId) {
                                item.cantidad = newQuantity;
                            }
                            return item;
                        });
                        
                        // Actualizar la interfaz
                        renderCartItems();
                        calculateTotals();
                        updateCartCount();
                    } else {
                        console.error('Error al actualizar la cantidad:', response.message);
                        // Recargar los items en caso de error
                        loadCartItems();
                    }
                } catch (e) {
                    console.error('Error al parsear la respuesta:', e);
                }
            } else {
                console.error('Error en la solicitud AJAX:', this.status);
            }
        };
        
        xhr.send(`userId=${userId}&itemId=${itemId}&quantity=${newQuantity}`);
    }
    
    // Función para eliminar un producto del carrito
    function removeFromCart(itemId) {
        const userId = getUserId();
        
        // Eliminar de la base de datos usando AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'remove_from_cart.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);
                    
                    if (response.success) {
                        // Eliminar del array local
                        cartItems = cartItems.filter(item => item.id !== itemId);
                        
                        // Actualizar la interfaz
                        renderCartItems();
                        calculateTotals();
                        updateCartCount();
                    } else {
                        console.error('Error al eliminar el producto:', response.message);
                        // Recargar los items en caso de error
                        loadCartItems();
                    }
                } catch (e) {
                    console.error('Error al parsear la respuesta:', e);
                }
            } else {
                console.error('Error en la solicitud AJAX:', this.status);
            }
        };
        
        xhr.send(`userId=${userId}&itemId=${itemId}`);
    }
    
    // Función para guardar un producto para más tarde (agregar a favoritos)
    function saveForLater(itemId) {
        const userId = getUserId();
        
        // Guardar en favoritos usando AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_for_later.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);
                    
                    if (response.success) {
                        // Si se guarda correctamente, eliminamos del carrito
                        removeFromCart(itemId);
                        
                        // Mostrar mensaje de éxito
                        alert('Producto guardado en tus favoritos');
                    } else {
                        console.error('Error al guardar para más tarde:', response.message);
                        alert('Error al guardar en favoritos. Por favor, inténtalo de nuevo.');
                    }
                } catch (e) {
                    console.error('Error al parsear la respuesta:', e);
                }
            } else {
                console.error('Error en la solicitud AJAX:', this.status);
            }
        };
        
        xhr.send(`userId=${userId}&itemId=${itemId}`);
    }
    
    // Función para calcular los totales
    function calculateTotals() {
        subtotal = 0;
        
        // Calcular el subtotal sumando el precio * cantidad de cada producto
        cartItems.forEach(item => {
            subtotal += parseFloat(item.precio) * parseInt(item.cantidad);
        });
        
        // Verificar si se aplica el envío gratuito (cuando el subtotal es mayor a cierta cantidad)
        shippingCost = subtotal > 1000 ? 0 : 50;
        
        // Calcular el total final
        totalAmount = subtotal + shippingCost - discountAmount;
        
        // Actualizar la interfaz con los nuevos totales
        updateTotals(subtotal, shippingCost, discountAmount);
    }
    
    // Función para actualizar los totales en la interfaz
    function updateTotals(subtotalValue, shippingValue, discountValue) {
        if (cartSubtotal) {
            cartSubtotal.textContent = `$${subtotalValue.toFixed(2)}`;
        }
        
        if (shippingCostElem) {
            if (shippingValue === 0 && subtotalValue > 0) {
                shippingCostElem.textContent = 'Gratis';
            } else {
                shippingCostElem.textContent = `$${shippingValue.toFixed(2)}`;
            }
        }
        
        if (discountContainer && discountAmountElem) {
            if (discountValue > 0) {
                discountContainer.style.display = 'flex';
                discountAmountElem.textContent = `-$${discountValue.toFixed(2)}`;
            } else {
                discountContainer.style.display = 'none';
            }
        }
        
        const total = subtotalValue + shippingValue - discountValue;
        
        if (cartTotal) {
            cartTotal.textContent = `$${total.toFixed(2)}`;
        }
        
        if (cartTotalAmountMini) {
            cartTotalAmountMini.textContent = `$${total.toFixed(2)}`;
        }
    }
    
    // Función para actualizar el contador de productos en el carrito
    function updateCartCount() {
        let totalItems = 0;
        
        cartItems.forEach(item => {
            totalItems += parseInt(item.cantidad);
        });
        
        if (cartCountBadge) {
            cartCountBadge.textContent = totalItems;
            
            // Mostrar u ocultar el badge según haya productos o no
            cartCountBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Función para aplicar un cupón de descuento
    function applyCoupon() {
        const couponCode = couponInput.value.trim();
        
        if (!couponCode) {
            alert('Por favor, ingresa un código de cupón');
            return;
        }
        
        // Verificar el cupón con el servidor
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'apply_coupon.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (this.status === 200) {
                try {
                    const response = JSON.parse(this.responseText);
                    
                    if (response.success) {
                        // Actualizar el descuento
                        discountAmount = response.discountAmount;
                        
                        // Recalcular totales
                        calculateTotals();
                        
                        // Mostrar mensaje de éxito
                        alert(`Cupón aplicado: ${response.message}`);
                    } else {
                        // Mostrar mensaje de error
                        alert(`Error: ${response.message}`);
                    }
                } catch (e) {
                    console.error('Error al parsear la respuesta:', e);
                }
            } else {
                console.error('Error en la solicitud AJAX:', this.status);
            }
        };
        
        xhr.send(`couponCode=${couponCode}`);
    }
    
    // Función para proceder al pago
    function proceedToCheckout() {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de continuar.');
            return;
        }
        
        // Redireccionar a la página de checkout
        window.location.href = 'checkout.html';
    }
});

