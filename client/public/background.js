/*global chrome*/

var STATUSES = {
  NOT_SET: 'NOT_SET',
  TIMER_RUNNING: 'TIMER_RUNNING',
  TIMER_PAUSED: 'TIMER_PAUSED',
  POMO_COMPLETE: 'POMO_COMPLETE'
};

var timer = {
  pomoDuration: moment.duration(25, 'minutes'),
  shortBreakDuration: moment.duration(5, 'minutes'),
  longBreakDuration: moment.duration(15, 'minutes'),
  countdownID: null,
  remaining: moment.duration(25, 'minutes'),
  timerStatus: STATUSES.NOT_SET,
  pomoCount: 0
};

var toggleTimer = function() {
  if (timer.timerStatus === 'POMO_COMPLETE') {
    timer.remaining = timer.pomoDuration;
  }

  if (timer.timerStatus !== 'TIMER_RUNNING') {
    timer.timerStatus = STATUSES.TIMER_RUNNING;
    timer.countdownID = setInterval(this.reduceTimer, 1000);
  } else {
    timer.countdownID = clearInterval(timer.countdownID);
    timer.timerStatus = STATUSES.TIMER_PAUSED;
  }
};

var reduceTimer = function() {
  var timerFinished =
    timer.remaining.get('minutes') === 0 &&
    timer.remaining.get('seconds') === 0;

  if (timerFinished) {
    timer.countdownID = clearInterval(timer.countdownID);
    timer.pomoCount = ++timer.pomoCount;
    timer.timerStatus = STATUSES.NOT_SET;
    this.onTimerEnd();
    return;
  }

  var timerDisplay = moment.duration(timer.remaining);
  timerDisplay.subtract(1, 'second');
  timer.remaining = timerDisplay;
};

var onTimerEnd = function() {
  if (timer.pomoCount === 8) {
    this.resetTimer('POMO_COMPLETE');
  } else {
    this.setTimerCycle();
    this.toggleTimer();
  }
};

var setTimerCycle = function() {
  if (timer.pomoCount % 2 === 0) {
    alert('Back to work! 📚');
    timer.remaining = timer.pomoDuration;
  } else {
    alert('Take a break! 🐣');
    timer.pomoCount < 7
      ? (timer.remaining = timer.shortBreakDuration)
      : (timer.remaining = timer.longBreakDuration);
  }
};

var resetTimer = function(status) {
  timer.timerStatus = STATUSES[status];
  timer.countdownID = clearInterval(timer.countdownID);
  timer.remaining = timer.pomoDuration;
  timer.pomoCount = 0;
};

setInterval(() => {
  console.log('timer.remaining', timer.remaining);
}, 1000);
