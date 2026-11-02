/*JS file for setting the timer function:*/
/* --Last updated: 09/25/2026 23:00 --*/
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
	if (s.value == 0) {
 		const modal = document.getElementById("session-modal");
 		modal.style.display = "block"; // Show notification
  		setTimeout(() => {
   		modal.style.display = "none"; // Hide notification after 5 seconds
		event.stopPropagation()
    	/*startBreakSession(); // Call your next function to start the break timer*/
  	}, 5000); 
}
	return;

}

start.addEventListener('click', function() {
	function startInterval() {
		startTimer = setInterval(function() {
			timer();
		}, 1000);
	}
	startInterval()
})

pause.addEventListener('click', function() {
	stopTimer()
})

reset.addEventListener('click', function() {
	h.value = 0;
	m.value = 0;
	s.value = 0;
	resetTimer()
})

/*Game
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const target = document.getElementById("target");
const StartBtn = document.getElementById("begin");

let score = 0;
let time = 10;
let best = 0;
let clock;

function moveTarget() {
	const x = Math.floor(Math.random() * 450);
	const y = Math.floor(Math.randon() * 300);
	target.style.left = x + "px";
	target.style.top = y + "px";
}

target.onclick = function () {
	score = score + 1;
	scoreEl.textContent = score;
	moveTarget();
}

function endGame() {
	clearInterval(clock);
	target.style.display = "none";
	StartBtn.textContent = "Play Again";
	StartBtn.disabled = false;
	if (score > best) {
		best = score;
		bestEl.textContent = best'
	}
	alert("Time's up! Your score: " + score);
}

StartBtn.onclick = function () {
	score = 0;
	time = 10;
	scoreEl.textContent = score;
	timeEl.textConten = time;
	StartBtn.disabled = true;
	target.style.display = "block";
	moveTarget();

	clock = SetInterval (function () {
		time = time - 1;
		timeEl.textContent = time;
		if (time <= 0) endGame();
	}, 1000);
}*/