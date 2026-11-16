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
