// Obtener el carrito del localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mostrar los productos en el carrito
const carritoDiv = document.getElementById('carrito');
if (cart.length === 0) {
    carritoDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
} else {
    let html = '<ul>';
    let total = 0;
    cart.forEach(item => {
        html += `
            <li>
                ${item.name} - $${item.price.toFixed(2)} - Cantidad: ${item.quantity} - Talla: ${item.size}, Color: ${item.color}
            </li>`;
        total += item.price * item.quantity;
    });
    html += '</ul>';
    html += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
    carritoDiv.innerHTML = html;
}

// Botón de pagar
document.getElementById('pagar').addEventListener('click', function () {
    alert('Redirigiendo al proceso de pago...');
    // Aquí podrías redirigir a una página de pago o realizar una acción de pago
    // Ejemplo: window.location.href = 'pago.html';
});