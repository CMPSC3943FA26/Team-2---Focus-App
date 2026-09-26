/*JS file for setting the timer function:*/
/* --Last updated: 09/25/2026 21:18 --*/

var start = document.getElementById('start');
var pause = document.getElementById('pause');

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

function stopTimer() {
	clearInterval(startTimer);
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
//	var h.value = 0;
//	var m.value = 0;
//	var s.value = 0;
	stopTimer()
})