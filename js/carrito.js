// Función para eliminar un producto del carrito
function removeFromCart(nombre) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var updatedCart = cart.filter(function(product) {
        if (product.nombre === nombre) {
            // Si el producto coincide, reducimos la cantidad en 1 o eliminamos el producto si la cantidad es 1
            if (product.cantidad > 1) {
                product.cantidad--;
                product.total = product.cantidad * product.precio;
                return true; // Manntener producto
            } else {
                return false; // Eliminar producto 
            }
        } else {
            // Si el producto no coincide, lo dejamos sin cambios
            return true;
        }
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    showCartProducts(updatedCart); // Actualizar la tabla después de eliminar un producto
}

// Función para mostrar los productos en el carrito
function showCartProducts(cart) {
    var cartTableBody = document.querySelector('#cart tbody');
    cartTableBody.innerHTML = ''; // Limpiar el contenido actual de la tabla
    var totalAmount = 0;

    cart.forEach(function(product) {
        // Dejar precio como CLP
        var precioFormatted = '$' + product.precio.toLocaleString('es-CL');
        var totalFormatted = '$' + product.total.toLocaleString('es-CL');
        totalAmount += product.total;

        var productHTML = `
            <tr>
                <td><img src="images/productos/${product.nombre}.jpg" alt="${product.nombre}" height="100"></td>
                <td>${product.nombre}</td>
                <td>${precioFormatted}</td>
                <td>${product.cantidad}</td>
                <td>${totalFormatted}</td>
                <td><button onclick="removeFromCart('${product.nombre}')">Eliminar</button></td>
            </tr>
        `;
        cartTableBody.innerHTML += productHTML;
    });

    // Actualizar el total 
    document.getElementById('total-amount').textContent = '$' + totalAmount.toLocaleString('es-CL');
}

// Obtener la lista de productos en el carrito del almacenamiento local
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mostrar los productos en el carrito al cargar la página
showCartProducts(cart);

// Función para agregar un producto al carrito
function addToCart(nombre, precio) {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var existingProductIndex = cart.findIndex(function(product) {
        return product.nombre === nombre;
    });
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].cantidad++;
        cart[existingProductIndex].total = cart[existingProductIndex].cantidad * cart[existingProductIndex].precio;
        alert('Producto agregado correctamente');

    } else {
        var cantidad = 1;
        var total = precio * cantidad;
        cart.push({ nombre: nombre, precio: precio, cantidad: cantidad, total: total });
        alert('Producto agregado correctamente');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showCartProducts(cart); // Actualizar la tabla después de agregar un producto
    
    // Mostrar una alerta de producto agregado
    
}

// Agregar evento al botón "Ir al Pago"
document.getElementById('checkout-btn').addEventListener('click', function() {
    window.location.href = 'payment/payment.html';
});




