/*global chrome*/
// import moment from './moment.js';
// var { moment } = require('./moment.js');

// var timerDisp = {
//   count: 0
// };

// setInterval(() => {
//   console.log('yay it works 👾', timerDisp.count);
//   timerDisp.count++;
// }, 1000);

var STATUSES = {
  NOT_SET: 'NOT_SET',
  TIMER_RUNNING: 'TIMER_RUNNING',
  TIMER_PAUSED: 'TIMER_PAUSED',
  POMO_COMPLETE: 'POMO_COMPLETE'
};

var timer = {
  pomoDuration: moment.duration(6, 'seconds'),
  shortBreakDuration: moment.duration(3, 'seconds'),
  longBreakDuration: moment.duration(10, 'seconds'),
  countdownID: null,
  remaining: moment.duration(6, 'seconds'),
  timerStatus: STATUSES.NOT_SET,
  pomoCount: 0
};

var toggleTimer = function() {
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
    this.completePomo();
  } else {
    this.setTimerCycle();
    this.toggleTimer();
  }
};

var setTimerCycle = function() {
  if (timer.pomoCount % 2 === 0) {
    timer.remaining = timer.pomoDuration;
  } else {
    timer.pomoCount < 7
      ? (timer.remaining = timer.shortBreakDuration)
      : (timer.remaining = timer.longBreakDuration);
  }
};

var completePomo = function() {
  timer.timerStatus = STATUSES.POMO_COMPLETE;
  timer.countdownID = clearInterval(timer.countdownID);
  timer.remaining = this.state.pomoDuration;
  timer.pomoCount = 0;
};

var resetTimer = function() {
  timer.timerStatus = STATUSES.NOT_SET;
  timer.countdownID = clearInterval(timer.countdownID);
  timer.remaining = timer.pomoDuration;
  timer.pomoCount = 0;
};

setInterval(() => {
  console.log('timer.remaining', timer.remaining);
}, 1000);
