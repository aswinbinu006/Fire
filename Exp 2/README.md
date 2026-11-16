# Experiment 2: Billing System Calculator

### Aim
Use var, let, const, and demonstrate basic features like template literals and destructuring; build a billing calculator with user input.

### Theory
- **`const`**: Declares a block-scoped constant value that cannot be reassigned (e.g., `const GST_RATE = 0.18`).
- **`var`**: Declares a function-scoped or global variable.
- **`let`**: Declares a block-scoped mutable variable (e.g., for storing calculated subtotal and totals).
- **Numeric Validation**: Ensures quantity is a positive whole integer and unit price is a positive number to prevent negative or nonsensical bills.
- **Object Destructuring**: Unpacks object properties into distinct variables (e.g., `const { customer: c, total: t } = bill`).
- **Template Literals**: Uses backticks (`` ` ``) and `${expression}` syntax to format dynamic strings without tedious string concatenation.

### Code

#### File 1: `script.js`
```javascript
// Constant tax rate (immutable)
const GST_RATE = 0.18;

function calculateBill() {
    // var demonstration
    var customer = document.getElementById("custName").value.trim();
    var product = document.getElementById("prodName").value.trim();

    // let demonstration
    let qty = Number(document.getElementById("qty").value);
    let price = Number(document.getElementById("price").value);
    const outputEl = document.getElementById("output");

    // Basic numeric validation: prevent negative or invalid values
    if (!customer || !product) {
        outputEl.innerHTML = "<p style='color: red;'>Please enter customer and product names.</p>";
        return;
    }
    if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
        outputEl.innerHTML = "<p style='color: red;'>Please enter a valid positive integer quantity.</p>";
        return;
    }
    if (isNaN(price) || price <= 0) {
        outputEl.innerHTML = "<p style='color: red;'>Please enter a valid positive unit price.</p>";
        return;
    }

    let subtotal = qty * price;
    let gst = subtotal * GST_RATE;
    let total = subtotal + gst;

    // Object creation
    const bill = {
        customer,
        product,
        qty,
        price,
        subtotal,
        gst,
        total
    };

    // Object Destructuring
    const { customer: c, product: p, qty: q, price: pr, subtotal: s, gst: g, total: t } = bill;

    // Template Literals
    outputEl.innerHTML = `
        <p>Customer: ${c}</p>
        <p>Product: ${p}</p>
        <p>Quantity: ${q}</p>
        <p>Price per Unit: ₹${pr.toFixed(2)}</p>
        <p>Subtotal: ₹${s.toFixed(2)}</p>
        <p>GST (18%): ₹${g.toFixed(2)}</p>
        <p><strong>Final Amount: ₹${t.toFixed(2)}</strong></p>
    `;
}
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 2 - Billing System</title>
</head>
<body>
    <h2>Billing System</h2>
    
    <label>Customer Name: </label>
    <input type="text" id="custName" value="Customer Name"><br><br>

    <label>Product Name: </label>
    <input type="text" id="prodName" value="Notebook"><br><br>

    <label>Quantity: </label>
    <input type="number" id="qty" value="2"><br><br>

    <label>Unit Price (₹): </label>
    <input type="number" id="price" value="50"><br><br>

    <button onclick="calculateBill()">Calculate Bill</button>

    <h3>Receipt</h3>
    <div id="output"></div>

    <script src="script.js"></script>
</body>
</html>
```

### Output
When the inputs are:
- Customer Name: `Customer Name`
- Product Name: `Notebook`
- Quantity: `2`
- Unit Price: `₹50.00`

The generated receipt displays:
```text
Customer: Customer Name
Product: Notebook
Quantity: 2
Price per Unit: ₹50.00
Subtotal: ₹100.00
GST (18%): ₹18.00
Final Amount: ₹118.00
```

If a negative or invalid quantity (e.g., `-2` or `0`) is entered:
`Please enter a valid positive integer quantity.`

### Conclusion
The billing calculator was successfully built using `var`, `let`, and `const` with basic numeric validation against negative inputs. Object destructuring and template literals were used to extract and format data accurately into a receipt showing the subtotal, 18% GST, and final amount.
