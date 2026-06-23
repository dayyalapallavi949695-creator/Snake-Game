const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");

const size = 20;
let dx,dy,snake,food,score,game;
function initGame(){
     dx = size; 
     dy = 0;
     score=0;

    snake = [{x: 200, y: 200}]; 
     food = {
  x: Math.floor(Math.random() * (canvas.width / size)) * size,
  y: Math.floor(Math.random() * (canvas.height / size)) * size
  };
  if (game)clearInterval(game);
  game=setInterval(draw,100);
}
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  switch(event.key) {
    case "ArrowUp":
      dx = 0; dy = -size;
      break;
    case "ArrowDown":
      dx = 0; dy = size;
      break;
    case "ArrowLeft":
      dx = -size; dy = 0;
      break;
    case "ArrowRight":
      dx = size; dy = 0;
      break;
  }
}
function updateSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / size)) * size,
      y: Math.floor(Math.random() * (canvas.height / size)) * size
    };
  } else {
    snake.pop(); // normal move
  }
}
function drawScore(){
    ctx.fillStyle="white";
    ctx.font="20px Arial";
    ctx.fillText("Score:"+score,10,20);

}
function drawSnake() {
  ctx.fillStyle = "lime";
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, size, size));
}
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, size, size);
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    clearInterval(game);
    alert("Game Over! You hit the wall.");
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(game);
      alert("Game Over! You ran into yourself.");
    }
  }
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateSnake();
  drawSnake();
  drawFood();
  checkCollision();
  drawScore();
}

document.getElementById("restartBtn").addEventListener("click",initGame);
initGame();
