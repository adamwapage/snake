const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Colors
const boardColor = '#222';
const snakeColor = '#F2F2F2';

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

// GAME START
function main() {
  clearCanvas();
  drawSnake();
}

main();

function clearCanvas() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(10, 10, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(snakeSegment => {
    console.log(snakeSegment);
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snakeSegment.x, snakeSegment.y, 10, 10);
  });
}
