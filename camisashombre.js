document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const sizeBtns = document.querySelectorAll('.size-btn');
    const colorOptions = document.querySelectorAll('.color-option');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const featuredImage = document.querySelector('.main-image img'); // Seleccionamos la imagen principal correctamente
    const addToCartBtn = document.getElementById('add-to-cart');
        // 1. Manejo de los ítems del menú
    const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function () {
                menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    
    // Verificación de elementos en consola para depuración
    console.log('Featured Image:', featuredImage);
    console.log('Color Options:', colorOptions);
    
    // Product state
    const productState = {
        quantity: 1,
        size: '',
        color: 'Blanco',
        price: 75.00
    };
    
    // Imágenes de los diferentes colores
    // Rutas actualizadas basadas en la estructura de tu código
    const colorImages = {
        'Blanco': 'img/camisahombre-blanca.jpg',
        'Negro': 'img/camisahombre-negra.jpg',
        'Azul Marino': 'img/camisahombre.webp'
    };
    
    // Quantity controls
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                productState.quantity = parseInt(quantityInput.value);
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            productState.quantity = parseInt(quantityInput.value);
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
            productState.quantity = parseInt(quantityInput.value);
        });
    }
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            sizeBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update state
            productState.size = this.getAttribute('data-size');
        });
    });
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update state
            const selectedColor = this.getAttribute('data-color');
            productState.color = selectedColor;
            
            console.log('Color seleccionado:', selectedColor);
            console.log('Ruta de imagen:', colorImages[selectedColor]);
            
            // Update product meta information
            const productMeta = document.querySelector('.product-meta');
            if (productMeta) {
                productMeta.textContent = `100% Algodón • Color ${productState.color}`;
            }
            
            // Cambiar la imagen según el color seleccionado
            if (featuredImage && colorImages[selectedColor]) {
                featuredImage.src = colorImages[selectedColor];
                console.log('Imagen actualizada a:', featuredImage.src);
            } else {
                console.error('Error al cambiar la imagen:', {
                    featuredImage: featuredImage,
                    selectedColor: selectedColor,
                    imagePath: colorImages[selectedColor]
                });
            }
        });
    });
    
    // Image thumbnails
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update the featured image
            if (featuredImage) {
                featuredImage.src = this.getAttribute('data-img');
            }
        });
    });
    
    // Add to cart button
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Check if size is selected
            if (!productState.size) {
                alert('Por favor selecciona una talla antes de añadir al carrito.');
                return;
            }
            
            // Create the cart item
            const cartItem = {
                code: 'C0306',
                name: 'Playera Cuello V Manga Corta para MUJER',
                price: productState.price,
                quantity: productState.quantity,
                size: productState.size,
                color: productState.color
            };
            
            console.log('Item added to cart:', cartItem);
            alert(`Producto añadido al carrito: ${cartItem.quantity} ${cartItem.name} - Talla: ${cartItem.size}, Color: ${cartItem.color}`);
            
            // You could also store the cart in localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    }
    
    // Initialize with default values
    if (sizeBtns.length > 2) {
        sizeBtns[2].click(); // Select Medium size by default (index 2)
    }
});