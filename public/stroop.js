var colours = ["Red", "Blue", "Green", "Yellow"]
var wordsMatch;
var startTimer = false;
var counter = 20;
var score = 0;

function generateRandomNums(){
  var randNum = Math.floor(Math.random() * Math.floor(3));
  var randNum2 = Math.floor(Math.random() * Math.floor(3));
  var textColour = Math.floor(Math.random() * Math.floor(3));
  console.log(randNum, randNum2, textColour);
  getRandWord(randNum, randNum2);
  changeWordColour(textColour);
  checkNums(randNum, textColour);
}

function getRandWord(num1, num2){
  var colour1 = colours[num1];
  console.log(colour1);
  document.getElementById("controlWord").innerHTML = colour1;
  var colour2 = colours[num2];
  document.getElementById("variableWord").innerHTML = colour2;
}

function changeWordColour(colour){
  var textColour = colours[colour];
  document.getElementById("variableWord").style.color = textColour;
}

function checkNums(num1, num2){
  if (num1 == num2) {
    wordsMatch = true;
  }
  else {
    wordsMatch = false;
  }
}

function userWordsMatch(){
  if (wordsMatch == true) {
    score++;
    var yourScore = document.getElementById('score');
    yourScore.innerHTML = score;
    generateRandomNums();
  }
  else {
    generateRandomNums();
  }
}

function userNoMatch(){
  if (wordsMatch == false) {
    score++;
    var yourScore = document.getElementById('score');
    yourScore.innerHTML = score;
    generateRandomNums();
  }
  else {
    generateRandomNums();
  }
}


var timeInterval = setInterval(function() { setTimer() }, 1000);

function setTimer(){
  if (startTimer == true) {
    var timer = document.getElementById('timer');
    timer.innerHTML = counter;
      if (counter == 0) {
        gameWon();
        counter = 20;
        window.startTimer = false;
      }
      counter--;
  }
}

function startTheTimer(){
  window.startTimer = true;
  var controlWord = document.getElementById('controlWord');
  controlWord.style.visibility = "visible";
  var variableWord = document.getElementById('variableWord');
  variableWord.style.visibility = "visible";
  setTimer();
}

function restartGame(){
  var timer = document.getElementById('timer');
  timer.innerHTML = 20;
}

function gameWon(){
  var modal = document.getElementById('modal-containerWonGame2');
  modal.style.display = "block";
}

function closeModalWon(){
  var modal = document.getElementById('modal-containerWonGame2');
  modal.style.display = "none";
}
