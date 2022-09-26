let operand1 = '';
let operand2 = '';
let activeOperand = 1;
const allNumberButtons = document.querySelectorAll('.number');

function Display() {
  this.displayOnScreen = function(value) {
    const LCD = document.getElementById('display');
    const subtextError = document.getElementById('subtext__error');
    const subtextNegative = document.getElementById('subtext__negative');
    const subtextMemory = document.getElementById('subtext__memory');

    if(isNaN(value)) {
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
          LCD.innerText = 'ERROR';
      }
    }
    else LCD.innerText = Number(value);
  }
}

function inputNumber(event) {
  const LCD_Display = new Display();
  let value = event.target.id;
  
  if (activeOperand === 1) {
    if (operand1.length < 8) {
      // Do not let to keep a 0 on the left side of the string. Be example: 0519
      if (operand1 === '' || Number(operand1) === 0) {
        operand1 = value;
        LCD_Display.displayOnScreen(Number(operand1));
      }
      else {
        operand1 += value;
        LCD_Display.displayOnScreen(Number(operand1));
      }
    }
  }
  else if (activeOperand === 2) {
    if (operand2.length < 8) {
      if (operand2 === '' || Number(operand2) === 0) {
        operand2 = value;
        LCD_Display.displayOnScreen(Number(operand2));
      }
      else {
        operand2 += value;
        LCD_Display.displayOnScreen(Number(operand2));
      }
    }
  }
}

allNumberButtons.forEach(button => button.addEventListener('click', inputNumber));