 const display = document.getElementById("display");

// Add a value to the display
function appendValue(value) {
    display.value += value;
}

// Clear everything
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate the answer
function calculate() {
    try {
        if (display.value === "") {
            return;
        }

        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}