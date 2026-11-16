# Experiment 3: Student Grading System

### Aim
Implement control structures and form validation; create a grading system based on user-entered marks.

### Theory
- **Form Validation:** Validates user inputs before processing. Regular expression `/^[a-zA-Z\s]+$/` ensures the name contains only letters. Empty mark fields are rejected prior to numeric conversion, and values are verified to lie between 0 and 100.
- **Loops (`for` loop):** Iterates over subject mark inputs to validate each field and accumulate the total sum.
- **Control Structures (`if...else if...else`):** Determines the final letter grade based on calculated percentage:
  - $\ge 90\%$: A+
  - $\ge 80\%$: A
  - $\ge 70\%$: B
  - $\ge 60\%$: C
  - $\ge 50\%$: D
  - $< 50\%$: F (Failed)

### Code

#### File 1: `script.js`
```javascript
function calculateGrade() {
    const name = document.getElementById("name").value.trim();
    const errorEl = document.getElementById("error");
    const outputEl = document.getElementById("output");

    errorEl.innerText = "";
    outputEl.innerHTML = "";

    // Form Validation: Name check
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        errorEl.innerText = "Please enter a valid alphabetic name.";
        return;
    }

    const subInputs = [
        document.getElementById("sub1").value.trim(),
        document.getElementById("sub2").value.trim(),
        document.getElementById("sub3").value.trim()
    ];

    let total = 0;

    // Loop through marks and validate: reject empty values before numeric conversion
    for (let i = 0; i < subInputs.length; i++) {
        if (subInputs[i] === "") {
            errorEl.innerText = "Marks for Subject " + (i + 1) + " cannot be empty.";
            return;
        }

        const mark = Number(subInputs[i]);
        if (isNaN(mark) || mark < 0 || mark > 100) {
            errorEl.innerText = "Marks for Subject " + (i + 1) + " must be between 0 and 100.";
            return;
        }
        total += mark;
    }

    const percentage = total / subInputs.length;
    let grade = "";
    let status = "Passed";

    // Conditional Control Structures
    if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
        status = "Failed";
    }

    outputEl.innerHTML = `
        <h3>Report Card</h3>
        <p>Name: ${name}</p>
        <p>Total Marks: ${total} / 300</p>
        <p>Percentage: ${percentage.toFixed(2)}%</p>
        <p>Grade: ${grade}</p>
        <p>Status: <strong>${status}</strong></p>
    `;
}
```

#### File 2: `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exp 3 - Student Grading System</title>
</head>
<body>
    <h2>Student Grading System</h2>

    <label>Student Name: </label>
    <input type="text" id="name"><br><br>

    <label>Subject 1 Marks: </label>
    <input type="number" id="sub1"><br><br>

    <label>Subject 2 Marks: </label>
    <input type="number" id="sub2"><br><br>

    <label>Subject 3 Marks: </label>
    <input type="number" id="sub3"><br><br>

    <button onclick="calculateGrade()">Calculate Grade</button>

    <p id="error" style="color: red;"></p>
    <div id="output"></div>

    <script src="script.js"></script>
</body>
</html>
```

### Output
With valid inputs (Name: `Student Name`, Marks: `85`, `90`, `80`):
```text
Report Card
Name: Student Name
Total Marks: 255 / 300
Percentage: 85.00%
Grade: A
Status: Passed
```
If a mark input is left empty:
`Marks for Subject 1 cannot be empty.`

### Conclusion
The student grading system was successfully implemented using loops and conditional control structures in JavaScript. Input validation was executed for student credentials and subject marks, accurately generating the total, percentage, grade, and pass/fail evaluation.
