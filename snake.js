const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = "right";

function draw() {
  // die Seite leeren
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // zeichnen der Schlange
  ctx.fillStyle = "#F8F8FF";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  // zeichnen des Essens
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function move() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Bewegung der Schlange
  if (direction === "right") headX += gridSize;
  else if (direction === "left") headX -= gridSize;
  else if (direction === "up") headY -= gridSize;
  else if (direction === "down") headY += gridSize;

  // Kollision mit der Wand
  if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
    gameOver();
    return;
  }

  // Kollision mit sich selber
  for (let i = 1; i < snake.length; i++) {
    if (headX === snake[i].x && headY === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Kollision mit dem Essen
  if (headX === food.x && headY === food.y) {
    // Generate new food
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

    // Verlängerung der Schlange
    snake.unshift({ x: headX, y: headY });
  } else {
    snake.unshift({ x: headX, y: headY });
    snake.pop();
  }
}

	// Game Over
function gameOver() {
  alert("Uh-Oh!");
  snake = [{ x: 0, y: 0 }];
  direction = "right";
}

function keyDownHandler(event) {
  // wasd input
  if (event.key === "d" && direction !== "left") {
    direction = "right";
  } else if (event.key === "a" && direction !== "right") {
    direction = "left";
  } else if (event.key === "w" && direction !== "down") {
    direction = "up";
  } else if (event.key === "s" && direction !== "up") {
    direction = "down";
  }
}

// Anfangszustand
window.addEventListener("keydown", keyDownHandler);
food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

// spiel loop
setInterval(() => {
  move();
  draw();
}, 100);
