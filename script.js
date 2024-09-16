document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElem = document.getElementById('totalPrice');
    const reviewList = document.getElementById('reviewList');

    // Function to update cart in localStorage
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to add items to the cart
    function addToCart(productId) {
        const productName = `Product ${productId}`;
        const productPrice = 1999; // Example price
        const cartItem = {
            id: productId,
            name: productName,
            price: productPrice
        };

        cart.push(cartItem);
        updateCart();
        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item cart-item';
            listItem.innerHTML = `
                ${item.name} - ₹${item.price}
                <button class="btn btn-danger btn-sm" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(listItem);
            totalPrice += item.price;
        });

        totalPriceElem.textContent = `₹${totalPrice}`;
    }

    // Handle Add to Cart button clicks on home page
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            addToCart(productId);
        });
    });

    // Handle Proceed to Checkout button click
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }
            window.location.href = 'order_summary.html';
        });
    }

    // Handle Remove button clicks in cart
    cartItemsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-danger')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    // Function to remove items from the cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
        updateCartDisplay();
    }

    // Initialize cart display on page load
    if (cartItemsList) {
        updateCartDisplay();
    }

    // Handle review form submission (if review section exists)
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const reviewText = document.getElementById('reviewText').value;

            if (reviewText.trim() === '') {
                alert('Please enter a review.');
                return;
            }

            addReview(reviewText);
            reviewForm.reset();
        });

        // Function to add reviews
        function addReview(text) {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'card review-card';
            reviewCard.innerHTML = `
                <div class="card-body">
                    <p class="card-text">${text}</p>
                </div>
            `;

            reviewList.appendChild(reviewCard);
        }
    }
});
