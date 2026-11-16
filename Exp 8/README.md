# Experiment 8: Form Validation and Events (Gym Admission)

### Aim
Access and validate form fields using events; design a gym admission form with live input checks.

### Theory
- **Accessing Elements & Values:** `document.getElementById('id')` retrieves the DOM element, and `.value` reads the user input string.
- **Event Listeners (`addEventListener`):** Attaches functions to events cleanly without inline attributes.
- **Events Used:**
  - `'input'`: Fires immediately as the user types, providing live validation without waiting for form submission.
  - `'change'`: Triggers when an option from a `<select>` dropdown is committed.
  - `'submit'`: Intercepts form submission using `event.preventDefault()` to run full validation across all fields simultaneously (avoiding short-circuiting) and display all errors without reloading the page.
- **Validation Constraints:** Name (at least 3 letters), Email (valid email format), Phone (10 digits starting with 6–9), Age (14 to 80), and Plan selection.

### Code

#### File 1: `script.js`
```javascript
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const ageInput = document.getElementById("age");
const planInput = document.getElementById("plan");
const form = document.getElementById("gymForm");
const output = document.getElementById("output");

// Validation functions
function checkName() {
    const val = nameInput.value.trim();
    const ok = val.length >= 3 && /^[a-zA-Z\s]+$/.test(val);
    document.getElementById("errName").innerText = ok ? "" : "Must be at least 3 letters.";
    return ok;
}

function checkEmail() {
    const val = emailInput.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    document.getElementById("errEmail").innerText = ok ? "" : "Invalid email.";
    return ok;
}

function checkPhone() {
    const val = phoneInput.value.trim();
    const ok = /^[6-9]\d{9}$/.test(val);
    document.getElementById("errPhone").innerText = ok ? "" : "Must be 10 digits starting with 6-9.";
    return ok;
}

function checkAge() {
    const val = Number(ageInput.value);
    const ok = val >= 14 && val <= 80;
    document.getElementById("errAge").innerText = ok ? "" : "Age must be 14-80.";
    return ok;
}

function checkPlan() {
    const ok = planInput.value !== "";
    document.getElementById("errPlan").innerText = ok ? "" : "Select a plan.";
    return ok;
}

// Event Listeners: 'input' and 'change'
nameInput.addEventListener("input", checkName);
emailInput.addEventListener("input", checkEmail);
phoneInput.addEventListener("input", checkPhone);
ageInput.addEventListener("input", checkAge);
planInput.addEventListener("change", checkPlan);

// 'submit' event: Run all validations without short-circuiting so all errors display
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const isNameValid = checkName();
    const isEmailValid = checkEmail();
    const isPhoneValid = checkPhone();
    const isAgeValid = checkAge();
    const isPlanValid = checkPlan();

    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPlanValid) {
        output.innerHTML = `
            <h3>Admission Confirmed!</h3>
            <p>Name: ${nameInput.value.trim()}</p>
            <p>Email: ${emailInput.value.trim()}</p>
            <p>Phone: ${phoneInput.value.trim()}</p>
            <p>Age: ${ageInput.value.trim()}</p>
            <p>Plan: ${planInput.value}</p>
        `;
        form.reset();
    } else {
        alert("Please fix form errors before submitting.");
    }
});
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 8 - Gym Admission Form</title>
</head>
<body>
    <h2>Gym Admission Form</h2>

    <form id="gymForm">
        <label>Full Name: </label>
        <input type="text" id="name">
        <span id="errName" style="color: red;"></span><br><br>

        <label>Email: </label>
        <input type="email" id="email">
        <span id="errEmail" style="color: red;"></span><br><br>

        <label>Phone (10 digits): </label>
        <input type="text" id="phone" maxlength="10">
        <span id="errPhone" style="color: red;"></span><br><br>

        <label>Age (14 - 80): </label>
        <input type="number" id="age">
        <span id="errAge" style="color: red;"></span><br><br>

        <label>Membership Plan: </label>
        <select id="plan">
            <option value="">Select Plan</option>
            <option value="Monthly (₹1500)">Monthly (₹1500)</option>
            <option value="Quarterly (₹4000)">Quarterly (₹4000)</option>
            <option value="Yearly (₹12000)">Yearly (₹12000)</option>
        </select>
        <span id="errPlan" style="color: red;"></span><br><br>

        <button type="submit">Submit Admission</button>
    </form>

    <div id="output" style="margin-top: 20px;"></div>

    <script src="script.js"></script>
</body>
</html>
```

### Output
When valid details are entered and submitted:
```text
Admission Confirmed!
Name: Student Name
Email: student@example.com
Phone: 9876543210
Age: 20
Plan: Quarterly (₹4000)
```
If the form is submitted with multiple empty or invalid fields, all validation errors display simultaneously under their respective fields.

### Conclusion
The gym admission form was successfully developed with JavaScript event handling and form validation. The application demonstrated element access with `getElementById()`, value retrieval via `.value`, live validation using `addEventListener('input')`, and complete non-short-circuiting form submission processing.
