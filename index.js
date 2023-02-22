/*1. Ustawiamy domyślne wartości dla constant obiektu calculator, dzięki temu będziemy mogli śledzić wartości

displayValue - trzyma string value który reprezentuje input wprowadzany przez uzytkownika, dzięki temu kontrolujemy
        co powinno być wyświetlane wewnątrz tego inputu
firstOperand(operacja) - będzie przyjmował pierwszy dla jakiejkolwiek ekspresjii, domyślnie będzie miał wartość null
operator - klucz ten będzie przechowywał operator danej ekspresji, z domyślną wartością null
waitingForSecondOperand - będzie sprawdzał jeśli firstOperand i operator będą wprowadzone, jeśli true to następna wprowadzona liczbą będzie secondoperand*/
const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

 /*4. Z racji tego, ze displayValue, to tak naprawdę to co wprowadzi uzytkownik, musimy to zmienić. Dzięki sprawdzeniu obu key w calculator za pomocą funkcji wywołanej przy klinkięciu mozemy odnieść się do nich
 7.
 displayValue - chcemy, aby funkcja wyświetlała wprowadzony numer
 waitingForSecond - jeśli key ten będzie ustawiony true, a będzie w wyniku function handleOperator, chcemy aby wartość z powrotem była ustawiona na false*/
 function inputNumber(number){
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === "0" ? number : displayValue + number;
    }
    /*Poniewaz waitingForSecondOperand domyślnie jest fałszem, przy odpaleniu aplikacji po wpisaniu numerów pojawią się one w inpucie */
}
/*5. W momencie, gdy kliknięta zostanie kropka, musimy dodać ją do display, chyba ze kropka jest juz dodana, wtedy nie, stąd przeczymy wyrazenie */
function inputDecimal(dot){
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
      }
      // If the `displayValue` property does not contain a decimal point
    if (!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    } 
}
/*6. Musimy sprawić aby wprowadzone operatory, czyli działania działały. Funkcja jako input będzie przyjmować kliknięty operator. Następnie tworzymy consta, który rozbije nam własności calculator
Tworzymy consta zawierającego liczbę wprowadzoną jako strina, zmieniamy z uzyciec parseFloat na liczbę
Tworzymy warunek, dzięki któremu funkcja sprawdzi czy wprowadzona wartość jest numerem czy nie, jeśli nie to firstOperand stanie się displayValue*/
function handleOperator(nextOperator) {
    const {firstOperand, displayValue, operator} = calculator
    const inputValue = parseFloat(displayValue);
    /* */
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        return;
    }
    // verify that `firstOperand` is null and that the `inputValue`
    // is not a `NaN` value
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator);
        // Wynik zwracamy jak string, bo jako string potem przyjmujemy wartość displayValue
        calculator.displayValue = parseFloat(result);
        // Zmieniamy firstOperand na wynik, aby móc dalej liczyć z wynikiem
        calculator.firstOperand = result;

    }
    /*Następnie  */
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
/*8. Drugim scenariuszem, którego potrzebuje to chwytanie momentu, w którym user wprowadzi drugi operand i operator jest juz wprwoadzony. W tym momencie, wszystkie składniki musimy wziąć i wyświetlić na ekranie
firstOperand równiez musi być zaktualizowany, dzięki temu wynik moze być ponownie uzyty w następnym działaniu*/
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
/*Funkcja ta bierze pierwszu operand i drugi a takze operator jako argument i sprawdza go aby zwrócić działanie w zalozności od wybranego operatora.
Musimy wprowadzić tą funkcję, w handleOperator */

/*9. Trzecim sceniariuszem  */
/*2. Tworzymy funkcję, która za kazdym razem, gdy odbędzie się jakaś operacja w apce będzie zawsze akutalizowała ekran, zmieniająć wyświetlaną wartość */
function updateDisplay() {
    const display = document.querySelector(".calculator-screen");
        display.value = calculator.displayValue;
    }
updateDisplay();

/*3. Musimy stworzyć const, który będzie brał jako array wszystkie dostępne przyciski w apce, na kliknięcie będzie wywoływał zawartość eventu, poprzez e.target, i w zalezności od rodzaju class zawartej w obiekcie będzie wykonywana inna funkcja  */
const keys = document.querySelector(".btn-toolbar");
keys.addEventListener("click", (e) => {
    //The target variable is an object that represents the element that was clicked.
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
    