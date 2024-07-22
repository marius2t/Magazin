document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search");
    const products = document.querySelectorAll(".product");
    const cartItems = document.getElementById("cart-items");
    const clearCartButton = document.getElementById("clear-cart");

    // Funcție de căutare
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();

        products.forEach(product => {
            const productName = product.dataset.name.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });

    // Adăugare produs în coș
    products.forEach(product => {
        product.querySelector(".add-to-cart").addEventListener("click", () => {
            const productName = product.dataset.name;
            const productPrice = product.dataset.price;

            addProductToCart(productName, productPrice);
            saveCart();
            displayCart();
        });
    });

    // Adăugare produs în coș și salvare în localStorage
    function addProductToCart(name, price) {
        const cart = getCart();
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Obține coșul de cumpărături din localStorage
    function getCart() {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    }

    // Afișează coșul de cumpărături
    function displayCart() {
        cartItems.innerHTML = "";
        const cart = getCart();

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - ${item.price} RON`;
            cartItems.appendChild(li);
        });
    }

    // Golește coșul de cumpărături
    clearCartButton.addEventListener("click", () => {
        localStorage.removeItem("cart");
        displayCart();
    });

    // Afișează coșul de cumpărături la încărcarea paginii
    displayCart();
});
