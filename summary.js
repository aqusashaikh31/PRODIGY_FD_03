document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('orderSummary');
    const orderTotalPrice = document.getElementById('orderTotalPrice');

    // Sample product data (in a real application, this would come from a server)
    const products = {
        '1': { name: 'Product 1', price: 1999 },
        
        // Add other products here
    };

    let totalPrice = 0;

    cart.forEach(item => {
        const product = products[item.id];
        if (product) {
            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item cart-item';
            listItem.innerHTML = `
                ${product.name} (₹${product.price}) x ${item.quantity}
                <span class="float-right">₹${itemTotal}</span>
            `;
            orderSummary.appendChild(listItem);
        }
    });

    orderTotalPrice.textContent = `₹${totalPrice}`;

    // Handle "Confirm Order" button click
    document.getElementById('confirmOrderButton').addEventListener('click', () => {
        alert('Order confirmed!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
});
