function turnOff() {
  const mainNumbers = document.getElementById('display');
  const subtext = document.querySelectorAll('.subtext');

  mainNumbers.innerText = '';
  subtext.forEach(subtextContainer => subtextContainer.innerText = '');
}