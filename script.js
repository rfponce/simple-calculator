let operand1 = '0';
let operand2 = '0';
let activeOperand = 1;
let operator = '';
const allNumberButtons = document.querySelectorAll('.number');
const allOperators = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');
const pointBtn = document.getElementById('point');
const clearButton = document.getElementById('clear');
const percentButton = document.getElementById('percent');
const signButton = document.getElementById('plus-minus-sign');
const onCaButton = document.getElementById('on-ca');

function Display() {
  this.displayOnScreen = function(value) {
    const LCD = document.getElementById('display');
    const subtextError = document.getElementById('subtext__error');
    const subtextNegative = document.getElementById('subtext__negative');
    const subtextMemory = document.getElementById('subtext__memory');

    switch(value) {
      case 'error-on':
        subtextError.innerText = 'E';
        break;
      case 'error-off':
        subtextError.innerText = '';
        break;
      case 'memory-on':
        subtextMemory.innerText = 'M';
        break;
      case 'memory-off':
        subtextMemory.innerText = '';
        break;
      default:
        if (value.toString().length > 9) LCD.innerText = 'NO SPACE' // Try to avoid display overflow
        else LCD.innerText = value;
    }
  }
}

function inputValue(value) {
  const LCD_Display = new Display();
  
  if (activeOperand === 1) {
    if (operand1.length < 8) {
      // Do not let to keep a 0 on the left side of the string. Be example: 0519
      if (operand1 === '0') {
        operand1 = value;
        LCD_Display.displayOnScreen(operand1);
      }
      else {
        if (value === '.' && !operand1.includes('.') || value !== '.') operand1 += value; // Avoid multiple points input
        LCD_Display.displayOnScreen(operand1);
      }
    }
  }
  else if (activeOperand === 2) {
    if (operand2.length < 8) {
      if (operand2 === '0') {
        operand2 = value;
        LCD_Display.displayOnScreen(operand2);
      }
      else {
        if (value === '.' && !operand2.includes('.') || value !== '.') operand2 += value;
        LCD_Display.displayOnScreen(operand2);
      }
    }
  }
}

function setOperator(value) {
  switch(value) {
    case '+':
      operator = '+';
      break;
    case '-':
      operator = '-';
      break;
    case '*':
      operator = '*';
      break;
    case '/':
      operator = '/';
      break;
  }
  activeOperand = 2;
}

function operate() {
  let result = '0';
  const LCD_Display = new Display();

  switch(operator) {
    case '+':
      result = Number(operand1) + Number(operand2);
      break;
    case '-':
      result = Number(operand1) - Number(operand2);
      break;
    case '*':
      result = Number(operand1) * Number(operand2);
      break;
    case '/':
      result = Number(operand1) / Number(operand2);
      break;
  }
  
  LCD_Display.displayOnScreen(manageDecimals(result));
  operand1 = result.toString();
  operand2 = '0';
  activeOperand = 1;
}

function manageInput(event) {
  if (event.type === 'keypress') {
    if (event.keyCode >= 48 && event.keyCode <= 57) { // If the key pressed was a number
      inputValue(event.key);
    }
    else {
      switch(event.key) {
        case '+':
          setOperator('+');
          break;
        case '-':
          setOperator('-');
          break;
        case '*':
          setOperator('*');
          break;
        case '/':
          setOperator('/');
          break;
        case 'Enter':
          operate();
          break;
        case '.':
          inputValue('.');
          break;
        case 'c':
          cleanValue();
          break;
        case '%':
          setPercent();
          break;
        case 's':
          setSign();
          break;
        case 'a':
          initializeCalculator();
          break;
      }
    }
  }
  else if (event.type === 'click') {
    if (event.target.className.includes('operator')) {
      switch(event.target.id) {
        case 'adding':
          setOperator('+');
          break;
        case 'subtracting':
          setOperator('-');
          break;
        case 'multiplying':
          setOperator('*');
          break;
        case 'dividing':
          setOperator('/');
          break;
      }
    }
    else if (event.target.className.includes('number')) inputValue(event.target.id)
    else if (event.target.id === 'point') inputValue('.')
  }
}

function manageDecimals(value) {
  let decimals = value % 1; // Separate the decimal part of a number
  let integers = Math.trunc(value);
  let decimalDigits = 8 - integers.toString().length; // Calculate how many decimal spaces are left to avoid overflow
  let formattedNumber;

  if (decimalDigits < 1) return value;
  else {
    formattedNumber = integers + Number(decimals.toFixed(decimalDigits));
     return formattedNumber;
  }
}

function cleanValue() {
  const LCD_Display = new Display();
  
  if (activeOperand === 1) operand1 = '0'
  else operand2 = '0'
  LCD_Display.displayOnScreen(0);
}

function setPercent() {
  if (activeOperand === 2) {
    operand2 = operand2 / 100;
    operate();
  }
}

function setSign() {
  const LCD_Display = new Display();
  
  if (activeOperand === 1) {
    if (!operand1.includes('-') && operand1 !== '0') {
      operand1 = '-' + operand1;
      LCD_Display.displayOnScreen(operand1);
    }
    else {
      operand1 = operand1.replace('-', '');
      LCD_Display.displayOnScreen(operand1);
    }
  }
  else if (activeOperand === 2) {
    if (!operand2.includes('-') && operand2 !== '0') {
      operand2 = '-' + operand2;
      LCD_Display.displayOnScreen(operand2);
    }
    else {
      operand2 = operand2.replace('-', '');
      LCD_Display.displayOnScreen(operand2);
    }
  }
}

function initializeCalculator() {
  operand1 = '0';
  operand2 = '0';
  activeOperand = 1;
  operator = '';
  const LCD_Display = new Display();

  LCD_Display.displayOnScreen('0');
  LCD_Display.displayOnScreen('error-off');
  LCD_Display.displayOnScreen('memory-off');
}

allNumberButtons.forEach(button => button.addEventListener('click', manageInput));
allOperators.forEach(operator => operator.addEventListener('click', manageInput));
equal.addEventListener('click', operate);
pointBtn.addEventListener('click', manageInput);
clearButton.addEventListener('click', cleanValue);
percentButton.addEventListener('click', setPercent);
signButton.addEventListener('click', setSign);
onCaButton.addEventListener('click', initializeCalculator);
document.addEventListener('keypress', manageInput);
document.addEventListener('DOMContentLoaded', initializeCalculator);