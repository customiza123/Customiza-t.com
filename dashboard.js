document.addEventListener('DOMContentLoaded', function() {
    // Configuración de datos de pedidos
    const pedidos = {
        "2024-03-14": [
            { id: 13500, status: "En proceso", cantidad: 1, idProducto: 1406, descripcion: "Blanco 2XL", diseno: "FOTO", idCliente: 1234 },
            { id: 13501, status: "Completado", cantidad: 2, idProducto: 1308, descripcion: "Azul, 34", diseno: "LOGO", idCliente: 1235 }
        ],
        "2024-03": [
            { id: 13502, status: "Pendiente", cantidad: 3, idProducto: 1090, descripcion: "Negro XL", diseno: "TEXTO", idCliente: 1240 }
        ]
    };

    const pedidosRecientes = [
        { id: 13500, status: "En proceso", cantidad: 1, descripcion: "Blanco 2XL", diseno: "FOTO", cliente: "1234" },
        { id: 13501, status: "Completado", cantidad: 2, descripcion: "Azul M", diseno: "LOGO", cliente: "1235" }
    ];

    // Referencias a elementos del DOM
    const datePicker = document.getElementById('datePicker');
    const monthPicker = document.getElementById('monthPicker');
    const ordersTableBody = document.getElementById('ordersTableBody');
    const toggleThemeBtn = document.getElementById('toggle-theme') || document.querySelector('.sidebar-menu a:last-child');
    const ordersContainer = document.getElementById('orders-container');
    const logo = document.querySelector('.logo');

    // Cargar pedidos en la tabla según la fecha
    function loadOrders(dateKey) {
        if (!ordersTableBody) return;
        
        ordersTableBody.innerHTML = "";
        const orders = pedidos[dateKey] || [];

        if (orders.length === 0) {
            ordersTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No hay pedidos para esta fecha</td></tr>`;
        } else {
            orders.forEach(order => {
                let row = `<tr>
                    <td>${order.id}</td>
                    <td>${order.status}</td>
                    <td>${order.cantidad}</td>
                    <td>${order.idProducto}</td>
                    <td>${order.descripcion}</td>
                    <td>${order.diseno}</td>
                    <td>${order.idCliente}</td>
                </tr>`;
                ordersTableBody.innerHTML += row;
            });
        }
    }

    // Renderizar tarjetas de pedidos recientes
    function renderPedidos() {
        if (!ordersContainer) return;
        
        ordersContainer.innerHTML = "";
        pedidosRecientes.forEach(pedido => {
            let card = `<div class="order-card">
                <h3>Pedido #${pedido.id}</h3>
                <p><strong>Status:</strong> ${pedido.status}</p>
                <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
                <p><strong>Diseño:</strong> ${pedido.diseno}</p>
            </div>`;
            ordersContainer.innerHTML += card;
        });
    }

    // Gestión del modo oscuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // Ajustar tamaño del logo si es necesario
    if (logo) {
        logo.addEventListener('load', function() {
            if (this.naturalWidth > 200) {
                this.style.maxWidth = '200px';
            }
        });
    }

    // Configurar eventos
    if (datePicker) {
        datePicker.addEventListener('change', () => loadOrders(datePicker.value));
    }
    
    if (monthPicker) {
        monthPicker.addEventListener('change', () => loadOrders(monthPicker.value));
    }
    
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDarkMode();
        });
    }

    // Inicializar componentes
    renderPedidos();
    
    // Aplicar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});
