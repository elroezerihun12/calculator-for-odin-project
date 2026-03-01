// =====================
// Math Functions
// =====================

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Nice try. Can't divide by 0 😏";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
  }
}

// =====================
// Calculator Logic
// =====================

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

// Update display when number is clicked
function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

// When operator is clicked
function chooseOperator(operator) {
  if (currentOperator !== null) evaluate(); // handles 12 + 7 - 1 case

  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

// When equals is clicked
function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);

  // Round long decimals
  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000;
  }

  display.textContent = result;
  currentOperator = null;
}

// Clear everything
function clearCalculator() {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

// =====================
// Button Event Listeners
// =====================

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      appendNumber(value);
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      chooseOperator(value);
    } else if (value === "=") {
      evaluate();
    } else if (value === "C") {
      clearCalculator();
    }
  });
});