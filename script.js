let dispValue = "0";
let firstNum;
let lastNum;
let operationBefore;
let operatorIsActive = false;
let equalBtnIsActive = false;
let click = false;

const insertNum = function(id) {
  if (equalBtnIsActive) {
    equalBtnIsActive = false;
    document.getElementById("ReadOut").value = "0";
  }
  if (
    document.getElementById("ReadOut").value != "Error" &&
    document.getElementById("ReadOut").value.length < 10
  ) {
    if (id.target.value != ".") {
      dispValue += id.target.value;
      dispValue = +dispValue;
      document.getElementById("ReadOut").value = +(
        document.getElementById("ReadOut").value + dispValue
      );
      dispValue = "0";
    } else {
      if (document.getElementById("ReadOut").value.indexOf(".") == -1) {
        console.log(document.getElementById("ReadOut").value);
        document.getElementById("ReadOut").value += ".";
      }
    }
  }
};

const getOperation = function(operation) {
  let display = document.getElementById("ReadOut").value;
  if (display.indexOf(".") == display.length - 1) {
    document.getElementById("ReadOut").value = display.substring(
      0,
      display.length - 1
    );
  }
  if (display != "Error") {
    if (firstNum == undefined) {
      firstNum = +display;
      document.getElementById("ReadOut").value = "0";
    } else if (lastNum == undefined && operatorIsActive) {
      lastNum = +display;
      calculate(operationBefore);
    }
    operatorIsActive = true;
    operationBefore = operation.target.value;
  }
};

const equal = function() {
  let display = document.getElementById("ReadOut").value;
  if (display.indexOf(".") == display.length - 1) {
    document.getElementById("ReadOut").value = display.substring(
      0,
      display.length - 1
    );
  }
  if (display != "Error") {
    if (firstNum != undefined && operatorIsActive) {
      lastNum = +display;
      operatorIsActive = false;
      calculate(operationBefore);
    }
  }
};

const insertFloat = function(el) {
  if (document.getElementById("ReadOut").value != "Error") {
    insertNum(el);
  }
};

const clean = function() {
  dispValue = "0";
  firstNum = undefined;
  lastNum = undefined;
  operationBefore = undefined;
  operatorIsActive = false;
  equalBtnIsActive = false;
  document.getElementById("ReadOut").value = "0";
};

function calculate(operation) {
  console.log(`${firstNum}` + " " + `${operationBefore}` + " " + `${lastNum}`);
  let tempResult = 0;

  switch (operation) {
    case String.fromCharCode(247):
      tempResult = divide(firstNum, lastNum);
      break;
    case String.fromCharCode(215):
      tempResult = multiply(firstNum, lastNum);
      break;
    case "-":
      tempResult = minus(firstNum, lastNum);
      break;
    case "+":
      tempResult = plus(firstNum, lastNum);
      break;
  }
  clean();
  if (tempResult == "Error" || tempResult == Infinity || isNaN(tempResult)) {
    document.getElementById("ReadOut").value = "Error";
    click = true;
    return;
  }

  firstNum = +tempResult.toFixed(1);
  equalBtnIsActive = true;
  document.getElementById("ReadOut").value = firstNum;
}

const plus = function(a, b) {
  return a + b;
};
const minus = function(a, b) {
  return a - b;
};
const divide = function(a, b) {
  if (b != 0) {
    return a / b;
  } else {
    return "Делить на 0 нельзя";
  }
};
const multiply = function(a, b) {
  return a * b;
};

const equalBtn = document
  .querySelector(".equally")
  .addEventListener("click", equal);
const cleaner = document.querySelector(".del").addEventListener("click", clean);
const makeFloat = document
  .querySelector(".dot")
  .addEventListener("click", el => {
    insertFloat(el);
  });
const numbers = document.querySelectorAll(".number");
const arithmeticOp = document.querySelectorAll(".arithmetic");

arithmeticOp.forEach(el => {
  el.addEventListener("click", getOperation);
});
numbers.forEach(el => {
  el.addEventListener("click", insertNum);
});
