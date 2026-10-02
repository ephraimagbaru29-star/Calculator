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

        saveHistory(expression, result);
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

// Apply a scientific function to the current display value
function sciApply(fn) {
    const raw = display.value.trim();

    // Constants — just insert the value
    if (fn === 'pi') { appendValue(String(Math.PI)); return; }
    if (fn === 'e')  { appendValue(String(Math.E));  return; }

    // For xʸ we need a second argument
    if (fn === 'pow') {
        if (raw === '') return;                        // nothing entered yet, wait
        const base = parseFloat(raw);
        if (isNaN(base)) return;
        const expStr = prompt('Enter the exponent (y):');
        if (expStr === null) return;                   // user cancelled
        const exp = parseFloat(expStr);
        if (isNaN(exp)) return;
        display.value = Math.pow(base, exp);
        saveHistory(`${base} ^ ${exp}`, display.value);
        return;
    }

    // All other functions operate on the current value or expression
    if (raw === '') return;                            // nothing entered yet, wait

    let value;
    try {
        value = eval(raw);   // evaluate any pending expression first
    } catch {
        return;              // incomplete expression, wait silently
    }

    if (isNaN(value) || value === undefined) return;  // not a valid number yet

    const mathFns = {
        sin:   v => Math.sin(v),
        cos:   v => Math.cos(v),
        tan:   v => Math.tan(v),
        log:   v => Math.log10(v),   // base-10 log (common log)
        log2:  v => Math.log2(v),
        sqrt:  v => Math.sqrt(v),
        cbrt:  v => Math.cbrt(v),
        abs:   v => Math.abs(v),
        floor: v => Math.floor(v),
    };

    const result = mathFns[fn](value);
    const label  = { sin:'sin', cos:'cos', tan:'tan', log:'log', log2:'log₂',
                      sqrt:'√', cbrt:'∛', abs:'|x|', floor:'⌊x⌋' }[fn];

    saveHistory(`${label}(${value})`, result);
    display.value = result;
}

// Save an entry to history
function saveHistory(expression, result) {
    const entry = `${expression} = ${result}`;
    history.unshift(entry);
    renderHistory();
}

// Toggle scientific panel
function toggleSci() {
    const isHidden = document.getElementById("sci-panel").classList.toggle("hidden");
    document.getElementById("more-btn").textContent = isHidden ? "more" : "less";
}

// Initialise
renderHistory();
