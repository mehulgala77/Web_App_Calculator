
const ALL_CLEAR = "AC";
const DELETE = "DEL";
const DECIMAL_POINT = ".";
const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const EQUAL = "=";

// Event listener for all the controls
$(".controls > *").on("click", handleInput);

function handleInput() {
  const userInput = this.textContent;
  const textOnScreen = $(".currentCalc").text();

  if( isNumber(userInput) ) {
    handleNumbers(textOnScreen, userInput);
  }
  else if (userInput === ALL_CLEAR) {
    handleAllClear();
  }
  else if (userInput === DELETE) {
    handleDelete(textOnScreen);
  }
  else if(userInput === DECIMAL_POINT) {
    handleDecimalPoint(textOnScreen, userInput);
  }
  else if ( isMathOperation(userInput) ) {
    handleMathOperation(textOnScreen, userInput);
  }
  else if (userInput === EQUAL) {
    handleEqual(textOnScreen, userInput);
  }
}

// -------------------------------------------------- Handlers

function handleNumbers(textOnScreen, userInput) {

  // No point starting with zero on screen;
  if(textOnScreen === "" && userInput === "0") {
    return;
  }

  $(".currentCalc").text(textOnScreen + userInput);
}

function handleAllClear() {
  $(".currentCalc").text("");
  $(".pastCalc").text("");
}

function handleDelete(textOnScreen) {
  if (textOnScreen !== "") {
    $(".currentCalc").text(textOnScreen.slice(0, -1));
  }
}

function handleDecimalPoint(textOnScreen, userInput) {
  if( ! textOnScreen.includes(DECIMAL_POINT) ) {
    $(".currentCalc").text(textOnScreen + userInput);
  }
}

function handleMathOperation(textOnScreen, userInput) {
  if (textOnScreen === "") return;

  if ($(".pastCalc").text() === "") {

    $(".pastCalc").text( textOnScreen + " " + userInput );
    $(".currentCalc").text("");

  }
  else {

    const inputs = getOperandsAndOperation(textOnScreen);
    const result = performArithmetic(inputs[0], inputs[1], inputs[2]);

    $(".pastCalc").text( result + " " + userInput);
    $(".currentCalc").text("");
  }
}

function handleEqual(textOnScreen, userInput) {
  if (textOnScreen === "" || $(".pastCalc").text() === "") return;

  const inputs = getOperandsAndOperation(textOnScreen);
  const result = performArithmetic(inputs[0], inputs[1], inputs[2]);

  $(".currentCalc").text(result);
  $(".pastCalc").text("");
}

function getOperandsAndOperation(textOnScreen) {
  const values = $(".pastCalc").text().split(" ");

  const firstOperand = parseFloat(values[0]);
  const secondOperand = parseFloat(textOnScreen);
  const operation = values[1];

  return [firstOperand, secondOperand, operation];
}

// ---------------------------------------------------- Utilities function
function isNumber(userInput) {
  return (! isNaN(parseInt(userInput)));
}

function isMathOperation(userInput) {
  if ( userInput === ADD ||
       userInput === SUBTRACT ||
       userInput === MULTIPLY ||
       userInput === DIVIDE)
  {
    return true;
  }
  return false;
}

function performArithmetic(firstOperand, secondOperand, operation) {

  switch(operation) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand !== 0 ? firstOperand / secondOperand : 0;
  }

}
