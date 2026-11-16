# Experiment 1: Three Methods of JavaScript & Console Methods

### Aim
Demonstrate Inline, Internal, and External JavaScript; Use Console Methods; Create a Webpage Showing User Information and a Welcome Message.

### Theory
JavaScript can be included in an HTML document in three ways:
1. **Inline JavaScript:** Placed directly inside an HTML tag attribute such as `onclick`.
2. **Internal JavaScript:** Written within `<script>` tags in the HTML document.
3. **External JavaScript:** Written in a separate `.js` file and linked using `<script src="script.js"></script>`.

The `console` object provides debugging methods:
- `console.log()`: Prints general messages.
- `console.info()`: Prints informational text.
- `console.warn()`: Displays warning messages.
- `console.error()`: Displays error messages.

### Code

#### File 1: `script.js`
```javascript
// External JavaScript File - script.js
function externalMessage() {
    console.log("External JS executed.");
    console.warn("External JS warning.");
    console.error("External JS error.");
    alert("External JavaScript executed from script.js");
}
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 1 - Three Methods of JavaScript</title>
    <!-- 3. External JavaScript Link -->
    <script src="script.js"></script>
    <script>
        // 2. Internal JavaScript
        function internalMessage() {
            console.log("Internal JS executed.");
            console.info("Internal JS info message.");
            alert("Internal JavaScript executed from <script> tag.");
        }
    </script>
</head>
<body onload="console.log('Welcome to JavaScript Lab!');">
    <h2>User Information</h2>
    <p><strong>Name:</strong> Student Name</p>
    <p><strong>PRN:</strong> 1234567890</p>
    <p><strong>Branch:</strong> Computer Science & Engineering</p>
    <p><strong>Welcome Message:</strong> Welcome to JavaScript Practical Lab!</p>

    <h3>Demonstrate Three JavaScript Methods</h3>
    <!-- 1. Inline JavaScript -->
    <button onclick="console.log('Inline JS executed.'); alert('Inline JavaScript executed!');">
        Inline JS
    </button>

    <!-- 2. Internal JavaScript -->
    <button onclick="internalMessage()">
        Internal JS
    </button>

    <!-- 3. External JavaScript -->
    <button onclick="externalMessage()">
        External JS
    </button>
</body>
</html>
```

### Output
- On page load, the browser console prints: `Welcome to JavaScript Lab!`
- Clicking **Inline JS** triggers an alert: `"Inline JavaScript executed!"` and logs to console.
- Clicking **Internal JS** triggers an alert: `"Internal JavaScript executed from <script> tag."` and logs info.
- Clicking **External JS** triggers an alert: `"External JavaScript executed from script.js"` and logs a log, warn, and error message in the console.

### Conclusion
The three methods of writing JavaScript—inline, internal, and external—were successfully demonstrated along with various console methods. The webpage displayed the required student information and welcome message accurately.
