// DOM Elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const modal = document.getElementById('myModal');
const restartButton = document.querySelector('#restart');
const message = document.querySelector('#message');
const finalScore = document.querySelector('#finalScore');

// Colors
const boardColor = '#222';
const snakeColor = '#F2F2F2';

// Event Listeners
document.addEventListener('keydown', changeDirection);
restartButton.addEventListener('click', restart);

// Global Init
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let xSpeed = 10;
let ySpeed = 0;

let foodX;
let foodY;
let gameScore = 0;
let gameOver = false;

// Game Refresh Rate (Difficulty)
let refreshSpeed = 80;

// Main
function main() {
  setInterval(() => {
    if (gameOver) {
      modal.style.display = 'block';
      if (gameScore <= 5) {
        message.innerHTML = 'Not great...';
      } else if (gameScore >= 6 && gameScore <= 10) {
        message.innerHTML = 'Getting better!';
      } else {
        message.innerHTML = 'Excellent!';
      }
      finalScore.innerHTML = gameScore;
      return;
    }
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    gameEnded();
  }, refreshSpeed);
}

function clearCanvas() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(snakeSegment => {
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snakeSegment.x, snakeSegment.y, 10, 10);
  });
}

function drawFood() {
  ctx.fillStyle = 'lightgreen';
  ctx.fillRect(foodX, foodY, 10, 10);
}

function moveSnake() {
  const head = { x: snake[0].x + xSpeed, y: snake[0].y + ySpeed };
  snake.unshift(head);

  const eatenFood = snake[0].x === foodX && snake[0].y === foodY;
  if (eatenFood) {
    gameScore++;
    score.innerHTML = gameScore;
    genFood();
  } else {
    snake.pop();
  }
}

function changeDirection(e) {
  const goingLeft = xSpeed === -10;
  const goingUp = ySpeed === -10;
  const goingRight = xSpeed === 10;
  const goingDown = ySpeed === 10;

  if (e.keyCode === 37 && !goingRight) {
    xSpeed = -10;
    ySpeed = 0;
  }

  if (e.keyCode === 38 && !goingDown) {
    xSpeed = 0;
    ySpeed = -10;
  }

  if (e.keyCode === 39 && !goingLeft) {
    xSpeed = 10;
    ySpeed = 0;
  }

  if (e.keyCode === 40 && !goingUp) {
    xSpeed = 0;
    ySpeed = 10;
  }
}

function gameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
    gameOver = true;
  }
}

function randomFood(min, max) {
  return Math.floor((Math.random() * canvas.width) / 10) * 10;
}

function genFood() {
  foodX = randomFood(0, canvas.width);
  foodY = randomFood(0, canvas.width);
  snake.forEach(snakeSegment => {
    const hasEaten = snakeSegment.x === foodX && snakeSegment.y === foodY;
    if (hasEaten) genFood();
  });
}

// RESTART
function restart() {
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
  ];

  xSpeed = 10;
  ySpeed = 0;

  gameOver = false;
  gameScore = 0;
  score.innerHTML = gameScore;
  genFood();
  modal.style.display = 'none';
}

// Function Calls
genFood();
main();