const mainNumbers = document.getElementById('display');
const subtext = document.querySelectorAll('.subtext');
const on_ca = document.querySelector('.button.on');
const memoryResultClear = document.getElementById('mrc');
const memorySub = document.getElementById('m-sub');
const memoryAdd = document.getElementById('m-add');
const off = document.getElementById('off');
const clear = document.getElementById('clear');
const percent = document.getElementById('percent');
const dividing = document.getElementById('dividing');
const seven = document.getElementById('7');
const eight = document.getElementById('8');
const nine = document.getElementById('9');
const multiplying = document.getElementById('multiplying');
const four = document.getElementById('4');
const five = document.getElementById('5');
const six = document.getElementById('6');
const subtracting = document.getElementById('subtracting');
const one = document.getElementById('1');
const two = document.getElementById('2');
const three = document.getElementById('3');
const adding = document.getElementById('adding');
const zero = document.getElementById('0');
const point = document.getElementById('point');
const equal = document.getElementById('equal');
let operand1 = null;
let operand2 = null;
let memory = null;
let isErrorActive = false;
let isNegativeNumberSignActive = false;
let displayValue = null;

function turnOff() {
  mainNumbers.innerText = '';
  subtext.forEach(subtextContainer => subtextContainer.innerText = '');
}

function turnOn_ClearDisplay() {
  
}

function add() {

}

function subtract() {

}

function multiply() {

}

function divide() {

}

function getSquareRoot() {

}

function getPercentage() {

}

function getResult() {

}

function setFloatingPoint() {

}

function addMemory() {

}

function subtractMemory() {

}

function getResult_ClearMemory() {

}

function setNumber() {

}