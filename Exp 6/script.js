// 1. Email validation using regex & string methods
function validateEmail() {
    const email = document.getElementById("emailInput").value.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);

    const atIndex = email.indexOf("@");
    const username = atIndex !== -1 ? email.slice(0, atIndex) : "N/A";
    const domain = atIndex !== -1 ? email.slice(atIndex + 1) : "N/A";

    document.getElementById("emailOutput").innerHTML = `
        <p>Valid: <strong>${isValid ? "Yes" : "No"}</strong></p>
        <p>Username: ${username}</p>
        <p>Domain: ${domain}</p>
    `;
}

// 2. Data extraction using regex match()
function extractData() {
    const text = document.getElementById("extractInput").value;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /\b\d{10}\b/g;

    const emails = text.match(emailRegex) || [];
    const phones = text.match(phoneRegex) || [];

    document.getElementById("extractOutput").innerHTML = `
        <p>Emails: ${emails.join(", ") || "None"}</p>
        <p>Phones: ${phones.join(", ") || "None"}</p>
    `;
}

// 3. Text analysis using string functions
function analyzeText() {
    const str = document.getElementById("textInput").value;
    const charCount = str.length;
    const wordCount = str.trim() ? str.trim().split(/\s+/).length : 0;
    const upper = str.toUpperCase();
    const replaced = str.replace(/javascript/gi, "JS");

    document.getElementById("textOutput").innerHTML = `
        <p>Characters: ${charCount}</p>
        <p>Words: ${wordCount}</p>
        <p>Uppercase: ${upper}</p>
        <p>Replaced: ${replaced}</p>
    `;
}
