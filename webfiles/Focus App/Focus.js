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

/*second timer

var startb = document.getElementById('startb');
var pauseb = document.getElementById('pauseb');

var hb = document.getElementById('hourb');
var mb = document.getElementById('minb');
var sb = document.getElementById('secb');

var startTimerb = null;

function timerb() {
	if (hb.value == 0 && mb.value == 0 && sb.value == 0) {
		hb.value = 0;
		mb.value = 0;
		sb.value = 0;
	} else if (sb.value != 0) {
		sb.value--;
	} else if (mb.value != 0 && sb.value == 0) {
		sb.value = 59;
		mb.value--;
	} else if (hb.value != 0 && mb.value == 0) {
		mb.value = 59;
		hb.value--;
	}
	return;
}

function stopTimerb() {
	clearInterval(startTimerb);
}

startb.addEventListener('click', function() {
	function startInterval() {
		startTimerb = setInterval(function() {
			timer();
		}, 1000);
	}
	startInterval()
})

pauseb.addEventListener('click', function() {
//	var hb.value = 0;
//	var mb.value = 0;
//	var sb.value = 0;
	stopTimerb()
})