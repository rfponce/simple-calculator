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