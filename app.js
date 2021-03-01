const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Colors
const boardBorderColor = '';
const boardColor = '#333';
const snakeBorderColor = '';
const snakeColor = '#F2F2F2';

ctx.fillStyle = boardColor;
ctx.fillRect(10, 10, canvas.width, canvas.height);
