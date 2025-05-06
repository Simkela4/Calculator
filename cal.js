const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let justEvaluated = false;

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
    if (b === 0) return 'Nice try.';
    return a / b;
}
function operate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}
function roundResult(num) {
    return Math.round(num * 1000) / 1000;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            if (justEvaluated) {
                currentInput = '';
                justEvaluated = false;
            }
            currentInput += value;
            display.textContent = currentInput;
        } else if (value === 'C') {
            currentInput = '';
            firstNumber = null;
            operator = null;
            waitingForSecondNumber = false;
            justEvaluated = false;
            display.textContent = '0';
        } else if (value === '=') {
            if (firstNumber !== null && operator && currentInput !== '') {
                const result = operate(firstNumber, operator, currentInput);
                if (typeof result === 'string') {
                    display.textContent = result;
                } else {
                    const rounded = roundResult(result);
                    display.textContent = rounded;
                    currentInput = rounded.toString();
                }
                firstNumber = null;
                operator = null;
                waitingForSecondNumber = false;
                justEvaluated = true;
            }
        } else {
            if (currentInput === '') {
                operator = value;
                return;
            }
            if (firstNumber !== null && operator && currentInput !== '') {
                const result = operate(firstNumber, operator, currentInput);
                if (typeof result === 'string') {
                    display.textContent = result;
                    currentInput = '';
                    firstNumber = null;
                    operator = null;
                    waitingForSecondNumber = false;
                    return;
                }
                const rounded = roundResult(result);
                display.textContent = rounded;
                firstNumber = rounded.toString();
                currentInput = '';
                operator = value;
                justEvaluated = false;
            } else {
                firstNumber = currentInput;
                operator = value;
                currentInput = '';
                waitingForSecondNumber = true;
                justEvaluated = false;
            }
        }
    });
});