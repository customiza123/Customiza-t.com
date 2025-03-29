
// Datos de PHP a JavaScript
const envios = <?php echo $enviosJSON; ?>;
const estadisticas = <?php echo $estadisticasJSON; ?>;

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar estadísticas
    document.getElementById('total-envios').textContent = estadisticas.total;
    document.getElementById('envios-entregados').textContent = estadisticas.entregados;
    document.getElementById('envios-pendientes').textContent = estadisticas.pendientes;
    
    // Cargar tabla de envíos
    const enviosTableBody = document.getElementById('enviosTableBody');
    enviosTableBody.innerHTML = '';
    
    envios.forEach(envio => {
        let row = `<tr>
            <td>${envio.id}</td>
            <td>${envio.id_pedido}</td>
            <td>${envio.nombre_cliente}</td>
            <td>${envio.direccion}</td>
            <td>${envio.fecha_envio}</td>
            <td>${envio.fecha_entrega_estimada}</td>
            <td>${envio.status}</td>
            <td>${envio.codigo_seguimiento || 'N/A'}</td>
            <td>
                <button class="btn-view" data-id="${envio.id}">Ver</button>
                <button class="btn-edit" data-id="${envio.id}">Editar</button>
            </td>
        </tr>`;
        enviosTableBody.innerHTML += row;
    });
    
    // Configurar gráfico
    const ctx = document.getElementById('enviosChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Entregados', 'En Tránsito', 'Pendientes'],
            datasets: [{
                data: [estadisticas.entregados, estadisticas.pendientes, estadisticas.total - estadisticas.entregados - estadisticas.pendientes],
                backgroundColor: ['#4CAF50', '#FFC107', '#9E9E9E']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribución de Envíos'
                }
            }
        }
    });
});