let score = 0;
var x = 40;
var y = 40;
var x2 = 100;
var y2 = 100;
var goLeft = false;
var goLeft2 = false;
let xoff = 0.0;
let yoff = 0.5;
let xoff2 = 0.3;
let yoff2 = 0.7;
let counter = 0;
let playMe = false;
let endOfGame = false;
let button;

function preload() {
  cheer = loadSound("cheer.mp3");
  sound = loadSound("sound.mp3")
}

function setup() {
  createCanvas(500, 300);
    sound.play();
  button = createButton("restart");
  button.hide();
}

function restart() {
  button.hide();
  score = 0;
  playMe = false;
  endOfGame = false;
  sound.play();
}

function hide() {
  button.hide();
}

function draw() {
  
  background(137, 207, 240);
  xoff = xoff + 0.02;
  let n = noise(xoff) * width;
  yoff = yoff + 0.02;
  let ny = noise(yoff) * height;
  let n2 = noise(xoff2) * width;
  let ny2 = noise(yoff2) * height;

  //text for the score in the top right
  textSize(32);
  text("Score:", 10, 30);
  textSize(32);
  text(score, 100, 32);

  //the 1st ellipse is going to be the circle the player is able to to control
  ellipse(mouseX, mouseY, 20, 20);
  fill(255, 0, 0);

  //the 2nd ellipse is going to be the 1st 'bomb'that if you touch the game ends

  //Circle 1
  ellipse(n, ny, 15, 15);
  fill(255, 0, 0);
  if (goLeft == false) {
    x = x + 3;
  }
  if (goLeft == true) {
    x = x - 3;
  }

  if (x > 450) {
    goLeft = true;
  }
  if (x < 0) {
    goLeft = false;
  }

  //
  let balldist = dist(n, ny, mouseX, mouseY);
  if (balldist < 10 && endOfGame == false) {
    score = score + 1;
  }

  if (balldist >= -10 && balldist <= 10) {
    console.log("endOfGame", endOfGame, "playMe", playMe);
  }

  // when the score is 100 or more then the game will stop and it will play the winning title screen.
  if (score >=100) {
    button.show();
    playMe = true; //cheering
    sound.stop();
    textSize(60);
    background(0);
    fill(random(255), 0, random(255));
    text("YOU WON", 100, 150);
    //button = createButton('restart');
    button.mousePressed(restart);
    button.position(220, 200);

    //counter++;

    // if (counter>300) {
    //cheer.stop();
    //  }
  }

  if (playMe == true && cheer.isPlaying() == false) {
    playTheAudio();
  }

  //when the score is back to 0 the cheer will stop.
  if (score == 0) {
    cheer.stop();
  }

  fill(255);
}

// reset the score the 0 if the scroll whell is used.
//function mouseWheel() {
//score = 0;

//}

function playTheAudio() {
  // score=0;
  playMe = false;
  endOfGame = true;
  cheer.play();
}
