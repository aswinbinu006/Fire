// Array of item objects
let cart = [
    { id: 1, name: "Book", price: 200, qty: 1 }
];

// 1. push(): Add item with positive price and positive integer quantity validation
function addItem() {
    const name = document.getElementById("name").value.trim();
    const priceStr = document.getElementById("price").value.trim();
    const qtyStr = document.getElementById("qty").value.trim();

    const price = Number(priceStr);
    const qty = Number(qtyStr);

    if (!name) {
        alert("Please enter an item name.");
        return;
    }
    if (priceStr === "" || isNaN(price) || price <= 0) {
        alert("Please enter a valid positive price.");
        return;
    }
    if (qtyStr === "" || isNaN(qty) || !Number.isInteger(qty) || qty <= 0) {
        alert("Please enter a valid positive integer quantity.");
        return;
    }

    cart.push({ id: Date.now(), name, price, qty });
    renderCart();

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "1";
}

// 2. filter(): Delete item
function deleteItem(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

// 3. map() & reduce(): Render & Calculate
function renderCart() {
    const tbody = document.getElementById("cartTable");

    // map() generates table rows
    tbody.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>₹${(item.price * item.qty).toFixed(2)}</td>
            <td><button onclick="deleteItem(${item.id})">Delete</button></td>
        </tr>
    `).join("");

    // reduce() calculates subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const discount = subtotal > 500 ? subtotal * 0.10 : 0;
    const finalTotal = subtotal - discount;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("discount").innerText = discount.toFixed(2);
    document.getElementById("total").innerText = finalTotal.toFixed(2);
}

// Initial render
window.onload = renderCart;
