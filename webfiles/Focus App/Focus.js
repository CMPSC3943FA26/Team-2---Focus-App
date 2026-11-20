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
	/*resetTimer();*/
})


    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const grid = 20, tiles = canvas.width / grid;
    let snake = [], food = { x: 10, y: 10 }, dx = 1, dy = 0, score = 0, gameId = null, locked = false;

    function resetSnake() {
      snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      dx = 1; dy = 0; score = 0; scoreEl.textContent = 0;
      placeFood();
    }

    function placeFood() {
      food.x = Math.floor(Math.random() * tiles);
      food.y = Math.floor(Math.random() * tiles);
      if (snake.some(p => p.x === food.x && p.y === food.y)) placeFood();
    }

    function startSnake() {
      resetSnake(); drawSnake();
      document.addEventListener('keydown', onKey);
      gameId = setInterval(tickSnake, 110);
    }

    function stopSnake() {
      clearInterval(gameId);
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault();
      if (locked) return;
      const k = e.key.toLowerCase();
      if ((k === 'arrowleft' || k === 'a') && dx !== 1) { dx = -1; dy = 0; locked = true; }
      else if ((k === 'arrowup' || k === 'w') && dy !== 1) { dx = 0; dy = -1; locked = true; }
      else if ((k === 'arrowright' || k === 'd') && dx !== -1) { dx = 1; dy = 0; locked = true; }
      else if ((k === 'arrowdown' || k === 's') && dy !== -1) { dx = 0; dy = 1; locked = true; }
    }

    function tickSnake() {
      locked = false;
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      if (head.x < 0 || head.x >= tiles || head.y < 0 || head.y >= tiles || snake.some(p => p.x === head.x && p.y === head.y)) {
        resetSnake(); return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10; scoreEl.textContent = score; placeFood();
      } else {
        snake.pop();
      }
      drawSnake();
    }

    function drawSnake() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(food.x * grid, food.y * grid, grid - 2, grid - 2);
      snake.forEach((p, i) => {
        ctx.fillStyle = i === 0 ? '#4ade80' : '#22c55e';
        ctx.fillRect(p.x * grid, p.y * grid, grid - 2, grid - 2);
      });
    }

