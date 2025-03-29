
        // Cargar datos desde PHP
        const clientes = <?php echo $clientesJSON; ?>;
        const estadisticas = <?php echo $estadisticasJSON; ?>;
        
        // Actualizar estadísticas en la página
        document.getElementById('total-clientes').textContent = estadisticas.total;
        document.getElementById('nuevos-mes').textContent = estadisticas.nuevos_mes;
        document.getElementById('clientes-frecuentes').textContent = estadisticas.frecuentes;
        document.getElementById('clientes-inactivos').textContent = estadisticas.inactivos;
        
        // Cargar tabla de clientes
        function cargarTablaClientes(clientesFiltrados = clientes) {
            const tbody = document.querySelector('#clientesTable tbody');
            tbody.innerHTML = '';
            
            clientesFiltrados.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefono}</td>
                    <td>${formatDate(cliente.fecha_registro)}</td>
                    <td><span class="status ${getClienteStatus(cliente)}">${getClienteStatusText(cliente)}</span></td>
                    <td>
                        <button class="btn-edit" data-id="${cliente.id}">Editar</button>
                        <button class="btn-delete" data-id="${cliente.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', () => editarCliente(btn.dataset.id));
            });
            
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', () => eliminarCliente(btn.dataset.id));
            });
        }
        
        // Función para formatear fechas
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES');
        }
        
        // Determinar estado del cliente
        function getClienteStatus(cliente) {
            // Lógica para determinar el estado según los datos del cliente
            // Ejemplo simple
            if (cliente.ultima_compra) {
                const ultimaCompra = new Date(cliente.ultima_compra);
                const hoy = new Date();
                const diffMeses = (hoy.getMonth() - ultimaCompra.getMonth()) + 
                                (hoy.getFullYear() - ultimaCompra.getFullYear()) * 12;
                
                if (diffMeses < 3) return 'activo';
                if (diffMeses >= 3 && diffMeses < 6) return 'medio';
                return 'inactivo';
            }
            return 'nuevo';
        }
        
        function getClienteStatusText(cliente) {
            const status = getClienteStatus(cliente);
            switch(status) {
                case 'activo': return 'Activo';
                case 'medio': return 'Reciente';
                case 'inactivo': return 'Inactivo';
                case 'nuevo': return 'Nuevo';
                default: return 'Desconocido';
            }
        }
        
        // Función para buscar clientes
        document.getElementById('searchButton').addEventListener('click', buscarClientes);
        document.getElementById('searchCliente').addEventListener('keyup', function(e) {
            if (e.key === 'Enter') buscarClientes();
        });
        
        function buscarClientes() {
            const searchTerm = document.getElementById('searchCliente').value.toLowerCase();
            const filterStatus = document.getElementById('filterStatus').value;
            
            let clientesFiltrados = clientes.filter(cliente => {
                const matchesTerm = cliente.nombre.toLowerCase().includes(searchTerm) || 
                                   cliente.email.toLowerCase().includes(searchTerm) || 
                                   cliente.telefono.includes(searchTerm);
                
                if (!filterStatus) return matchesTerm;
                
                const status = getClienteStatus(cliente);
                return matchesTerm && status === filterStatus;
            });
            
            cargarTablaClientes(clientesFiltrados);
        }
        
        // Cargar gráfico de clientes
        function cargarGraficoClientes() {
            const ctx = document.getElementById('clientesChart').getContext('2d');
            
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Activos', 'Inactivos', 'Nuevos este mes'],
                    datasets: [{
                        data: [
                            estadisticas.total - estadisticas.inactivos - estadisticas.nuevos_mes,
                            estadisticas.inactivos,
                            estadisticas.nuevos_mes
                        ],
                        backgroundColor: [
                            '#4CAF50', 
                            '#F44336',
                            '#2196F3'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Distribución de Clientes'
                        }
                    }
                }
            });
        }
        
        // Funciones para editar y eliminar clientes
        function editarCliente(id) {
            const cliente = clientes.find(c => c.id == id);
            if (cliente) {
                // Aquí iría la lógica para abrir un modal de edición
                alert(`Editando cliente: ${cliente.nombre}`);
                // En una implementación real, aquí se abriría un formulario de edición
            }
        }
        
        function eliminarCliente(id) {
            if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
                // Aquí iría la llamada AJAX para eliminar el cliente en la base de datos
                alert(`Cliente ${id} eliminado con éxito`);
                // En una implementación real, se haría una petición al servidor
            }
        }
        
        // Inicializar la página
        document.addEventListener('DOMContentLoaded', () => {
            cargarTablaClientes();
            cargarGraficoClientes();
            
            // Alternar tema oscuro/claro
            document.getElementById('toggle-theme').addEventListener('click', function(e) {
                e.preventDefault();
                document.body.classList.toggle('dark-theme');
            });
        });