
// Datos de PHP a JavaScript
const productos = <?php echo $productosJSON; ?>;
const estadisticas = <?php echo $estadisticasJSON; ?>;
const categorias = <?php echo $categoriasJSON; ?>;

document.addEventListener('DOMContentLoaded', function() {
    // Mostrar estadísticas
    document.getElementById('total-productos').textContent = estadisticas.total_productos;
    document.getElementById('stock-bajo').textContent = estadisticas.stock_bajo;
    document.getElementById('sin-stock').textContent = estadisticas.sin_stock;
    document.getElementById('valor-total').textContent = '$' + parseFloat(estadisticas.valor_total).toFixed(2);
    
    // Cargar categorías en los filtros
    const filterCategoria = document.getElementById('filterCategoria');
    const selectCategoria = document.getElementById('categoria');
    
    categorias.forEach(categoria => {
        let option1 = document.createElement('option');
        option1.value = categoria.id;
        option1.textContent = categoria.nombre;
        filterCategoria.appendChild(option1);
        
        let option2 = document.createElement('option');
        option2.value = categoria.id;
        option2.textContent = categoria.nombre;
        selectCategoria.appendChild(option2);
    });
    
    // Cargar tabla de productos
    const productosTableBody = document.getElementById('productosTableBody');
    productosTableBody.innerHTML = '';
    
    productos.forEach(producto => {
        let row = `<tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categoria}</td>
            <td class="${producto.stock <= producto.stock_minimo ? 'stock-warning' : ''}">${producto.stock}</td>
            <td>${producto.stock_minimo}</td>
            <td>$${parseFloat(producto.precio).toFixed(2)}</td>
            <td>
                <button class="btn-edit" data-id="${producto.id}">Editar</button>
                <button class="btn-delete" data-id="${producto.id}">Eliminar</button>
            </td>
        </tr>`;
        productosTableBody.innerHTML += row;
    });
    
    // Modal para nuevo producto
    const modal = document.getElementById('productFormModal');
    const newProductBtn = document.getElementById('newProductBtn');
    const closeBtn = document.querySelector('.close');
    
    newProductBtn.addEventListener('click', function() {
        document.getElementById('modalTitle').textContent = 'Nuevo Producto';
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // Event listeners para botones de editar
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const producto = productos.find(p => p.id == productId);
            
            document.getElementById('modalTitle').textContent = 'Editar Producto';
            document.getElementById('productId').value = producto.id;
            document.getElementById('nombre').value = producto.nombre;
            document.getElementById('descripcion').value = producto.descripcion;
            document.getElementById('categoria').value = producto.id_categoria;
            document.getElementById('stock').value = producto.stock;
            document.getElementById('stockMinimo').value = producto.stock_minimo;
            document.getElementById('precio').value = producto.precio;
            
            modal.style.display = 'block';
        });
    });
});