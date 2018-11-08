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
  countdownID: null,
  remaining: moment.duration(9, 'seconds'),
  timerStatus: STATUSES.NOT_SET,
  pomoCount: 0
};

setInterval(() => {
  console.log('timer.remaining', timer.remaining);
}, 1000);
