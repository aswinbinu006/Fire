# Experiment 5: Shopping Cart & Bill Calculator (Arrays)

### Aim
Apply array methods and object handling; create a cart total calculator with discount logic.

### Theory
- **Array of Objects:** Stores structured records where each element is an object representing a cart item (`{ id, name, price, qty }`).
- **Input Validation:** Enforces positive numeric prices and positive whole integers for quantities (`Number.isInteger(qty)`).
- **`push()`:** Adds a new item object to the end of the array.
- **`filter()`:** Deletes an item by creating a new array excluding the specified item ID.
- **`map()`:** Transforms each item object into an HTML `<tr>` string to dynamically populate the table.
- **`reduce()`:** Iterates over the items and computes the cumulative subtotal (`sum + price * qty`).
- **Discount Logic:** If the subtotal exceeds ₹500, a 10% discount is applied.

### Code

#### File 1: `script.js`
```javascript
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
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 5 - Cart Calculator</title>
</head>
<body>
    <h2>Shopping Cart</h2>

    <label>Item Name: </label>
    <input type="text" id="name">
    <label>Price (₹): </label>
    <input type="number" id="price" step="any">
    <label>Qty: </label>
    <input type="number" id="qty" value="1">
    <button onclick="addItem()">Add Item</button>

    <h3>Cart Items</h3>
    <table border="1" cellpadding="6">
        <thead>
            <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="cartTable"></tbody>
    </table>

    <h3>Bill Summary</h3>
    <p>Subtotal: ₹<span id="subtotal">0.00</span></p>
    <p>Discount (10% if > ₹500): ₹<span id="discount">0.00</span></p>
    <p><strong>Final Total: ₹<span id="total">0.00</span></strong></p>

    <script src="script.js"></script>
</body>
</html>
```

### Output
With the initial item (`Book`, Price: ₹200, Qty: 1) and after adding (`Pen`, Price: ₹400, Qty: 1):
- **Subtotal:** ₹600.00
- **Discount (10% because > ₹500):** ₹60.00
- **Final Total:** ₹540.00
- Entering invalid quantity (e.g. `2.5` or `-1`) alerts: `Please enter a valid positive integer quantity.`
- Clicking **Delete** removes the item and immediately recalculates the subtotal and discount using `filter()` and `reduce()`.

### Conclusion
The shopping cart calculator was successfully implemented using JavaScript arrays and objects. The application effectively demonstrated `push()` for item insertion with positive price and positive integer validation, `filter()` for item removal, `map()` for dynamic table rendering, and `reduce()` for subtotal computation with discount logic.
