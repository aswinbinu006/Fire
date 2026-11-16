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
