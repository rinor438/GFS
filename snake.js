const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = "right";

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "#F8F8FF";
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });

  // Draw the food
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function move() {
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Move the snake based on the current direction
  if (direction === "right") headX += gridSize;
  else if (direction === "left") headX -= gridSize;
  else if (direction === "up") headY -= gridSize;
  else if (direction === "down") headY += gridSize;

  // Check for collisions with the walls
  if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height) {
    gameOver();
    return;
  }

  // Check for collisions with itself
  for (let i = 1; i < snake.length; i++) {
    if (headX === snake[i].x && headY === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Check for collisions with the food
  if (headX === food.x && headY === food.y) {
    // Generate new food
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

    // Increase the snake length
    snake.unshift({ x: headX, y: headY });
  } else {
    // Move the snake by adding a new head and removing the tail
    snake.unshift({ x: headX, y: headY });
    snake.pop();
  }
}

function gameOver() {
  alert("Uh-Oh!");
  snake = [{ x: 0, y: 0 }];
  direction = "right";
}

function keyDownHandler(event) {
  // Change direction based on wasd input
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

// Set up the initial state
window.addEventListener("keydown", keyDownHandler);
food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

// Main game loop
setInterval(() => {
  move();
  draw();
}, 100);
