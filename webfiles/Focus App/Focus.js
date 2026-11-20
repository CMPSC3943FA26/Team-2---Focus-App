/*JS file for setting the timer function:*/
/* --Last updated: 11/02/2026 14:00 --*/
/*example of a timer function */

var start = document.getElementById('start');
var pause = document.getElementById('pause');
var reset = document.getElementById('reset');

var h = document.getElementById('hour');
var m = document.getElementById('min');
var s = document.getElementById('sec');

var startTimer = null;

function timer() {
	if (h.value == 0 && m.value == 0 && s.value == 0) {
		h.value = 0;
		m.value = 0;
		s.value = 0;
	} else if (s.value != 0) {
		s.value--;
	} else if (m.value != 0 && s.value == 0) {
		s.value = 59;
		m.value--;
	} else if (h.value != 0 && m.value == 0) {
		m.value = 59;
		h.value--;
	}
	return;
}


start.addEventListener('click', function() {
	clearInterval(startTimer);
	startTimer = setInterval(timer, 1000);
})

pause.addEventListener('click', function() {
	clearInterval(startTimer);
})

reset.addEventListener('click', function() {
	h.value = 0;
	m.value = 0;
	s.value = 0;
})

/* Snake Game JS */

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("snake-canvas");
  // Safely exit if this JS file is loaded on a page without the Snake game
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const scoreEl = document.getElementById("snake-score");
  const highScoreEl = document.getElementById("snake-high-score");
  const actionBar = document.getElementById("snake-action-bar");
  const speedSelect = document.getElementById("snake-speed-select");
  const startBtn = document.getElementById("snake-start-btn");

  const gridSize = 20;
  const tileCount = canvas.width / gridSize;

  let snake = [];
  let food = { x: 15, y: 15 };
  let dx = 0;
  let dy = 0;
  let score = 0;
  let highScore = localStorage.getItem("snakeHighScore") || 0;
  let gameLoop;
  let isGameOver = false;
  let isGameRunning = false;
  let changingDirection = false;

  highScoreEl.textContent = highScore;

  // Render initial start screen
  function drawStartScreen() {
    ctx.fillStyle = "#11111b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Snake", canvas.width / 2, canvas.height / 2 - 12);

    ctx.font = "15px system-ui, sans-serif";
    ctx.fillStyle = "#a6adc8";
    ctx.fillText("Click 'Start Game' below to play", canvas.width / 2, canvas.height / 2 + 18);
  }

  function startGame() {
    snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    dx = 1;
    dy = 0;
    score = 0;
    isGameOver = false;
    isGameRunning = true;
    scoreEl.textContent = score;
	actionBar.style.display = "none";
    /*startBtn.style.display = "none";*/
    spawnFood();

	const selectSpeed = Number(speedSelect.value);

    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, selectSpeed); /*chnaged from 100 */
  }

  function update() {
    if (isGameOver || !isGameRunning) return;
    changingDirection = false;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check wall or self collision
    if (
      head.x < 0 || head.x >= tileCount ||
      head.y < 0 || head.y >= tileCount ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      endGame();
      return;
    }

    snake.unshift(head);

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      scoreEl.textContent = score;
      if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
        localStorage.setItem("snakeHighScore", highScore);
      }
      spawnFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function draw() {
    // Clear board
    ctx.fillStyle = "#11111b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "#f38ba8";
    ctx.beginPath();
    ctx.arc(
      food.x * gridSize + gridSize / 2,
      food.y * gridSize + gridSize / 2,
      gridSize / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#a6e3a1" : "#40a02b";
      ctx.fillRect(
        segment.x * gridSize + 1,
        segment.y * gridSize + 1,
        gridSize - 2,
        gridSize - 2
      );
    });
  }

  function spawnFood() {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
    // Ensure food doesn't spawn on the snake
    if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
      spawnFood();
    }
  }

  function endGame() {
    isGameOver = true;
    isGameRunning = false;
    clearInterval(gameLoop);

    ctx.fillStyle = "rgba(17, 17, 27, 0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "16px system-ui, sans-serif";
    ctx.fillStyle = "#a6adc8";
    ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 + 20);

    startBtn.textContent = "Play Again";
    actionBar.style.display = "flex";
  }

  // Arrow keys only
  document.addEventListener("keydown", function (e) {
    if (!isGameRunning) return;

    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (arrowKeys.includes(e.key)) {
      e.preventDefault();

      if (changingDirection) return;
      changingDirection = true;

      const goingUp = dy === -1;
      const goingDown = dy === 1;
      const goingRight = dx === 1;
      const goingLeft = dx === -1;

      if (e.key === "ArrowLeft" && !goingRight) {
        dx = -1; dy = 0;
      } else if (e.key === "ArrowUp" && !goingDown) {
        dx = 0; dy = -1;
      } else if (e.key === "ArrowRight" && !goingLeft) {
        dx = 1; dy = 0;
      } else if (e.key === "ArrowDown" && !goingUp) {
        dx = 0; dy = 1;
      }
    }
  });

  startBtn.addEventListener("click", startGame);

  // Display start screen on load
  drawStartScreen();
});

