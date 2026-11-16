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
