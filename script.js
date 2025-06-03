const inputDisplay = document.getElementById("calculator-input");
const outputDisplay = document.getElementById("calculator-output");
const historyDisplay = document.getElementById("history-display");
let input = "";
let output = "";

function press(value) {
  if (input === "0" && typeof value === "number") {
    input = "" + value;
  } else {
    input += value;
  }
  inputDisplay.textContent = input;
}

function calculate() {
  try {
    let expression = input.replace(/\^/g, "**");
    output = eval(expression);
    outputDisplay.textContent = output;

    if (output != undefined) {
        addToHistory(input, output);
    }

    input = output.toString();
  } catch (e) {
    outputDisplay.textContent = "Error";
  }
}

document.getElementById("clear-btn").addEventListener("click", () => {
  input = input.slice(0, -1);
  inputDisplay.textContent = input || "0";
});

document.getElementById("clear-all-btn").addEventListener("click", () => {
  input = "";
  output = "";
  inputDisplay.textContent = "0";
  outputDisplay.textContent = "0";
});

function addToHistory(expr, result) {
  const entry = document.createElement("div");
  entry.textContent = `${expr} = ${result}`;
  historyDisplay.appendChild(entry);
}

document.getElementById("clear-history-btn").addEventListener("click", () => {
  historyDisplay.innerHTML = "";
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
  
    if (/[\d+\-*/.^]/.test(key)) {
      press(key);
    } 

    else if (key === "Enter" || key === "=") {
      calculate();
    } 

    else if (key === "Backspace") {
      input = input.slice(0, -1);
      inputDisplay.textContent = input || "0";
    } 

    else if (key === "Escape") {
      input = "";
      output = "";
      inputDisplay.textContent = "0";
      outputDisplay.textContent = "0";
    }
  });