let operand1 = '0';
let operand2 = '0';
let activeOperand = 1;
let operator = '';
const allNumberButtons = document.querySelectorAll('.number');
const allOperators = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');
const pointBtn = document.getElementById('point');

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
      case 'negative-on':
        subtextNegative.innerText = '-';
        break;
      case 'negative-off':
        subtextNegative.innerText = '';
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
      if (Number(operand1) === 0) {
        operand1 = value;
        LCD_Display.displayOnScreen(operand1);
      }
      else {
        operand1 += value;
        LCD_Display.displayOnScreen(operand1);
      }
    }
  }
  else if (activeOperand === 2) {
    if (operand2.length < 8) {
      if (Number(operand2) === 0) {
        operand2 = value;
        LCD_Display.displayOnScreen(operand2);
      }
      else {
        operand2 += value;
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
  let result;
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
  
  LCD_Display.displayOnScreen(result);
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

allNumberButtons.forEach(button => button.addEventListener('click', manageInput));
allOperators.forEach(operator => operator.addEventListener('click', manageInput));
equal.addEventListener('click', operate);
pointBtn.addEventListener('click', manageInput);
document.addEventListener('keypress', manageInput);