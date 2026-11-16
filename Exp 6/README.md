# Experiment 6: String Functions and Regular Expressions

### Aim
Use string functions and regex for email validation, data extraction, and text analysis.

### Theory
- **Regular Expressions (Regex):** Patterns used to match character combinations in strings:
  - Email Validation: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` verifies the presence of username, `@`, domain, and period.
  - Phone Extraction: `/\b\d{10}\b/g` searches globally (`g`) for exact 10-digit numbers bounded by word boundaries (`\b`).
- **String Functions:**
  - `trim()`: Strips leading/trailing spaces.
  - `indexOf('@')`: Finds the character index of `@`.
  - `slice(start, end)`: Extracts substrings for username and domain.
  - `split(/\s+/)`: Splits string by whitespace into words to determine word count.
  - `replace()`: Replaces targeted words (e.g. `replace(/javascript/gi, "JS")`).
  - `length`: Returns character count.

### Code

#### File 1: `script.js`
```javascript
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
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 6 - String Functions & Regex</title>
</head>
<body>
    <h2>1. Email Validation</h2>
    <input type="text" id="emailInput" value="user@example.com">
    <button onclick="validateEmail()">Validate Email</button>
    <div id="emailOutput"></div>

    <h2>2. Data Extraction</h2>
    <textarea id="extractInput" rows="3" cols="50">Contact info@test.com or call 9876543210. Support: help@test.org, 9123456789.</textarea><br>
    <button onclick="extractData()">Extract Emails & Phones</button>
    <div id="extractOutput"></div>

    <h2>3. Text Analysis</h2>
    <input type="text" id="textInput" size="50" value="JavaScript is a versatile scripting language."><br><br>
    <button onclick="analyzeText()">Analyze Text</button>
    <div id="textOutput"></div>

    <script src="script.js"></script>
</body>
</html>
```

### Output
1. **Email Validation:**
   - Input: `user@example.com`
   - Output: `Valid: Yes`, `Username: user`, `Domain: example.com`
2. **Data Extraction:**
   - Emails: `info@test.com, help@test.org`
   - Phones: `9876543210, 9123456789`
3. **Text Analysis:**
   - Characters: `44`
   - Words: `6`
   - Uppercase: `JAVASCRIPT IS A VERSATILE SCRIPTING LANGUAGE.`
   - Replaced: `JS is a versatile scripting language.`

### Conclusion
The experiment demonstrated the practical application of regular expressions and string manipulation methods in JavaScript. Client-side email validation, automated extraction of emails and phone numbers, and string analysis were successfully performed.
