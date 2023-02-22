const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputNumber(number){
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === "0" ? number : displayValue + number;
    }
    
}
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
      }
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    } 
}
function handleOperator(nextOperator) {
    const {firstOperand, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue);
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = parseFloat(result);
        calculator.firstOperand = result;

    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
function calculate(firstOperand, secondOperand, operator){
    if (operator === "+"){
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    } else if (operator === "*") {
        return firstOperand * secondOperand;
    } else if (operator === "%") {
        return firstOperand % secondOperand
    } else if (operator === "**")
        return firstOperand ** secondOperand
    return secondOperand;
}
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    const display = document.querySelector(".calculator-screen");
        display.value = calculator.displayValue;
    }
updateDisplay();

const keys = document.querySelector(".btn-toolbar");
keys.addEventListener("click", (e) => {
    const { target } = e;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case '**':
        case '=':
          handleOperator(value);
          break;
        case '.':
          inputDecimal(value);
          break;
        case 'C':
          resetCalculator();
          break;
        default:
          if (Number.isInteger(parseFloat(value))) {
            inputNumber(value);
          }
      }
    
      updateDisplay();
    });
    
