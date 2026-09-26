/*JS file for setting the timer function:*/
/* --Last updated: 09/25/2026 21:18 --*/

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

let countdownInterval;
let remainingTime = parseInt(s.value);
timerDisplay.textContent = formatTime(remainingTime);
countdownInterval = setInterval(() => {
	remainingTime--;
	if (remainingTime >= 0) {
		timerDisplay.textContent = formatTime(remainingTime);
	} else {
		clearInterval(countdownInterval);
		timerDisplay.textContent = "0:0:0";
		alert("Timer has ended! Let's take a break.");
		s.value = "";
	}
}, 1000);
}