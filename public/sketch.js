var grid;
var cols;
var rows;
var w = 80;
var totalTiles = 6;
var endGameCounter = 0;
var tileCounter = 0;
var wonGameCounter = 0;
var counter = 15;
var yourScore = 0;
var startTimer = false;

// gloabal variable boolean game start true or false pass this varaible into timer

// make lots of seperate functions

function make2DArray(cols, rows){
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function setup(){
  var canvas = createCanvas(401, 401);
  canvas.parent('gameSpace1');
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new cell(i * w, j * w, w);
    }
  }
  // Pick tiles spots
  for (var n = 0; n < totalTiles; n++) {
    var i = floor(random(cols));
    var j = floor(random(rows));
    grid[i][j].tile = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].tile == true) {
        tileCounter++;
      }
    }
  }
  console.log("tile counter: " + tileCounter);
  turnOffPR();
}

var timeInterval = setInterval(function() { setTimer() }, 1000);


function setTimer(){
  console.log(startTimer);
  if (startTimer == true) {
    var timer = select('#timer');
    timer.html('10');
      counter--;
      timer.html(counter);
      if (counter == 0) {
        timeUp();
        counter = 15;
      }
  }
}


function turnOffSR(){
  var revealSketch = document.getElementById('revealSketch');
  revealSketch.style.pointerEvents = "none";
  revealSketch.style.cursor = "default";
  revealSketch.style.cssText = "background-color:#E0E4F8; color:#cccccc;";
  var restartGame = document.getElementById('restartGame1');
  restartGame.style.pointerEvents = "none";
  restartGame.style.cursor = "default";
  var startGame = document.getElementById('startGame1');
  startGame.style.cssText = "background-color: #3c50fc; color: #fff;"
  startGame.style.pointerEvents = "all";
  startGame.style.cursor = "pointer";
}

function turnOffSP(){
  var revealSketch = document.getElementById('revealSketch');
  revealSketch.style.pointerEvents = "none";
  revealSketch.style.cursor = "default";
  var restartGame = document.getElementById('restartGame1');
  restartGame.style.cssText = "background-color: #3c50fc; color: #fff;";
  restartGame.style.pointerEvents = "all";
  restartGame.style.cursor = "pointer";
  var startGame = document.getElementById('startGame1');
  startGame.style.cssText = "background-color:#E0E4F8; color:#cccccc;";
  startGame.style.pointerEvents = "none";
  startGame.style.cursor = "default";
}

function turnOffPR(){
  var revealSketch = document.getElementById('revealSketch');
  revealSketch.style.cssText = "background-color: #3c50fc; color: #fff;";
  revealSketch.style.pointerEvents = "all";
  revealSketch.style.cursor = "pointer";
  var restartGame = document.getElementById('restartGame1');
  restartGame.style.cssText = "background-color:#E0E4F8; color:#cccccc;";
  restartGame.style.pointerEvents = "none";
  restartGame.style.cursor = "default";
  var startGame = document.getElementById('startGame1');
  startGame.style.pointerEvents = "none";
  startGame.style.cursor = "default";
  hideSketch();
}




function revealSketch(){
  var sketch = document.getElementById('gameSpace1');
  sketch.style.visibility = "visible";
  turnOffSR();
}

function hideSketch(){
  var sketch = document.getElementById('gameSpace1');
  sketch.style.visibility = "hidden";
}

function hideAll(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = false;
    }
  }
  turnOffSP();
  window.startTimer = true;
  setTimer();
}

function gameOver(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
  var modal = document.getElementById('modal-containerLostGame');
  modal.style.display = "block";
  tileCounter = 0;
  endGameCounter = 0;
}

function timeUp(){
  var modal = document.getElementById('modal-containerTimeUp');
  modal.style.display = "block";
  window.startTimer = false;
  tileCounter = 0;
  endGameCounter = 0;
}


function closeModalLost(){
  var modal = document.getElementById('modal-containerLostGame');
  modal.style.display = "none";
  hideSketch();
}

function closeModalTimeUp(){
  var modal = document.getElementById('modal-containerTimeUp');
  modal.style.display = "none";
  hideSketch();
}

function closeModalWon(){
  var modal = document.getElementById('modal-containerWonGame');
  modal.style.display = "none";
  hideSketch();
}

function gameWon(){
  var modal = document.getElementById('modal-containerWonGame');
  modal.style.display = "block";
  tileCounter = 0;
  addPoints();
  stopTimer();
}

function mousePressed(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)){
        grid[i][j].reveal();
        if (!grid[i][j].tile) {
          console.log("end game " + endGameCounter);
          endGameCounter++;
          if (endGameCounter == 3) {
            window.startTimer = false;
            gameOver();
            }
          }
        if (grid[i][j].tile) {
            wonGameCounter++;
            console.log("won game counter: " + wonGameCounter);
            if (wonGameCounter == tileCounter) {
              gameWon();
            }
        }
      }
    }
  }
}

function draw(){
  background(0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}


function addPoints(){
    var score = select('#score');
    yourScore++;
    localStorage.setItem('Your Score', yourScore);
    scoreCounter = localStorage.getItem('Your Score');
    score.html(scoreCounter);
}
