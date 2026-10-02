 const display = document.getElementById("display");
const historyPanel = document.getElementById("history-panel");
const historyList = document.getElementById("history-list");

let history = [];

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

        const expression = display.value;
        const result = eval(expression);
        const entry = `${expression} = ${result}`;

        history.unshift(entry);
        renderHistory();

        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}

// Toggle history panel visibility
function toggleHistory() {
    const isHidden = historyPanel.classList.toggle("hidden");
    document.getElementById("history-btn").textContent = isHidden ? "🕘" : "✕";
}

// Render history entries
function renderHistory() {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = '<li class="no-history">No history yet</li>';
        return;
    }

    history.forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = entry;
        li.title = "Tap to reuse";
        li.addEventListener("click", () => {
            const result = entry.split(" = ")[1];
            display.value = result;
        });
        historyList.appendChild(li);
    });
}

// Clear history
function clearHistory() {
    history = [];
    renderHistory();
}

// Toggle scientific panel
function toggleSci() {
    const isHidden = document.getElementById("sci-panel").classList.toggle("hidden");
    document.getElementById("more-btn").textContent = isHidden ? "more" : "less";
}

// Initialise
renderHistory();
