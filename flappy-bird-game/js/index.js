var canvas = document.getElementById("gamezone");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");

var birdimg = new Image();
var mainbackground = new Image();
birdimg.src = "images/bird.png";
mainbackground.src = "images/main-background.png";

var tubeabove = new Image();
var tubebelow = new Image();
tubeabove.src = "images/tube-above.png";
tubebelow.src = "images/tube-below.png";

var gameScore = 0;
var distanceBetweentubes = 140;
var distanceToBottomtube = 0;

var bird = {
  x: 0,
  y: 0,
};

mainbackground.onload = function () {
  bird.x = mainbackground.width / 5;
  bird.y = mainbackground.height / 2;
  run();
};

// Create the object tubes to contain the tubes movements
var tubes = [];
// Create the first tube at the right side of the screen and y = 0
tubes[0] = { x: canvas.width, y: 0 };

var gravity = 0.7; // Acceleration due to gravity
var tubeSpeed = 1; // Speed of the tubes
var birdLift = 70; // Speed at which the bird jumps up

function run() {
  // Draw background and bird
  ctx.drawImage(mainbackground, 0, 0);
  ctx.drawImage(birdimg, bird.x, bird.y);

  // Handle tubes
  for (var i = 0; i < tubes.length; i++) {
    ctx.drawImage(tubeabove, tubes[i].x, tubes[i].y);
    distanceToBottomtube = tubeabove.height + distanceBetweentubes;
    ctx.drawImage(tubebelow, tubes[i].x, tubes[i].y + distanceToBottomtube);

    // Move tubes to the left
    tubes[i].x -= tubeSpeed;

    // Create new tube
    if (tubes[i].x === canvas.width / 2) {
      tubes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * tubeabove.height) - tubeabove.height,
      });
    }

    // Remove tubes that are off-screen
    if (tubes[i].x + tubeabove.width < 0) {
      tubes.shift();
    }

    // Score logic
    if (tubes[i].x === bird.x) {
      gameScore++;
    }

    // Collision detection
    if (
      bird.y + birdimg.height >= canvas.height || // Hits the ground
      (bird.x + birdimg.width >= tubes[i].x && // Bird is at the tube's x range
        bird.x <= tubes[i].x + tubeabove.width && // Bird is within tube's width
        (bird.y <= tubes[i].y + tubeabove.height || // Hits the top tube
          bird.y + birdimg.height >= tubes[i].y + distanceToBottomtube)) // Hits the bottom tube
    ) {
      return;
    }
  }
  // Display score
  score.innerHTML = "Score: " + gameScore;

  // Apply gravity
  bird.y += gravity;

  // Continue the game
  requestAnimationFrame(run);
}

// Jump logic
document.addEventListener("keydown", function () {
  bird.y -= birdLift; // Apply upward force
});

run();
