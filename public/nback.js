var listOfNums = [];
var nback = false;
var counter = 0;
var nbackCounter = 2;
var delayCounters = 3;
var startNbackTimer = false;
var nbackTimeLeft = 5;
var yourScore = 0;
var numRepition = true;
var userOneClick = true;
var img = document.createElement("img");

function generateRandomNum(){
  if (numRepition == true) {
    var randNum = Math.floor(Math.random() * Math.floor(3));
    numRepition = false;
  }
  else {
      var randNum = Math.floor(Math.random() * Math.floor(2));
      numRepition = true;
  }
  if (delayCounters <= 0) {
    nbackCounter++;
    counter++;
  }
  userOneClick = true;
  delayCounters--;
  addToArray(randNum);
  displayImage(randNum);
}

function displayImage(newNum){
  var loc = "images/"+newNum+".svg";
  var imageId = document.getElementById("shapeImage");
  imageId.src = loc;
  var src = document.getElementById("gameSpace3");
  src.appendChild(imageId);
}

// var loc = "images/"+newNum+".png";
// img.src = loc;
// var src = document.getElementById("gameSpace3");
// src.appendChild(img);

function addToArray(num){
  listOfNums.push(num);
  console.log(listOfNums);
}

function incrementCounters(){
  nbackCounter++;
  counter++;
}

function checkArray(){
  if (userOneClick == true) {
    if (listOfNums[counter] == listOfNums[nbackCounter]) {
      addToScore();
    }
    else {
      takeAwayScore();
    }
    userOneClick = false;
  }
}

function addToScore(){
  yourScore++;
  document.getElementById("score").innerHTML = yourScore;
  if (yourScore == 5) {
    startNbackTimer = false;
    nbackTimeLeft = 5;
    gameWon();
  }
}

function takeAwayScore(){
  if (yourScore > 0) {
    yourScore--;
    document.getElementById("score").innerHTML = yourScore;
  }
}

var timeInterval = setInterval(function() { setNbackTimer() }, 1000);

function setNbackTimer(){
  if (startNbackTimer == true) {
      if (nbackTimeLeft == 0) {
        nbackTimeLeft = 5;
        generateRandomNum();
      }
      var timer = document.getElementById("timer");
      timer.innerHTML = nbackTimeLeft;
      nbackTimeLeft--;
  }
}

function startGame3(){
  startNbackTimer = true;
  setNbackTimer();
}

function gameWon(){
  var modal = document.getElementById('modal-containerWonGame3');
  modal.style.display = "block";
}

function closeModalWon(){
  var modal = document.getElementById('modal-containerWonGame3');
  modal.style.display = "none";
}
