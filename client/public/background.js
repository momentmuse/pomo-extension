/*global chrome*/

// IMPORTANT: background.js page is not compatible with let, const, and other ES6 features

// var openOptions = function() {
//   window.open(chrome.runtime.getURL('options.html'));
// };

// create options dialog in pop-up
// save this to chrome.storage with sync
var someUrls = [
  '*://www.facebook.com/*',
  '*://www.reddit.com/*',
  '*://www.youtube.com/*',
  '*://www.instagram.com/*'
];

var blockCurrentTab = function() {
  console.log('lalalala 🎼');
  // chrome.tabs.query ... may have to put into a content script?
};

var blockRequest = function(details) {
  return { cancel: true };
};

// need to check for timer.timerStatus === 'TIMER_RUNNING'
var toggleBlockFilters = function(urls) {
  chrome.webRequest.onBeforeRequest.hasListener(blockRequest)
    ? chrome.webRequest.onBeforeRequest.removeListener(blockRequest)
    : chrome.webRequest.onBeforeRequest.addListener(
        blockRequest,
        { urls: urls },
        ['blocking']
      );
};

var STATUSES = {
  NOT_SET: 'NOT_SET',
  TIMER_RUNNING: 'TIMER_RUNNING',
  TIMER_PAUSED: 'TIMER_PAUSED',
  POMO_COMPLETE: 'POMO_COMPLETE'
};

var timer = {
  pomoDuration: moment.duration(25, 'seconds'),
  shortBreakDuration: moment.duration(15, 'seconds'),
  longBreakDuration: moment.duration(15, 'seconds'),
  countdownID: null,
  remaining: moment.duration(25, 'seconds'),
  timerStatus: STATUSES.NOT_SET,
  pomoCount: 0
};

var toggleTimer = function() {
  if (timer.timerStatus === 'NOT_SET' && timer.pomoCount === 0) {
    toggleBlockFilters(someUrls);
  }

  if (timer.timerStatus !== 'TIMER_RUNNING') {
    timer.timerStatus = STATUSES.TIMER_RUNNING;
    timer.countdownID = setInterval(reduceTimer, 1000);
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
    // pomoCount must be increased before status is set
    timer.pomoCount = ++timer.pomoCount;
    // this line causes the next cycle to auto-run
    // delete for manual initiation (deleting this will break the block functionality)
    timer.timerStatus = STATUSES.NOT_SET;
    onTimerEnd();
    return;
  }

  var timerDisplay = moment.duration(timer.remaining);
  timerDisplay.subtract(1, 'second');
  timer.remaining = timerDisplay;
};

var onTimerEnd = function() {
  // filter block permissions?
  toggleBlockFilters(someUrls);

  if (timer.pomoCount === 8) {
    resetTimer('POMO_COMPLETE');
  } else {
    setTimerCycle();
    toggleTimer();
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
  chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  timer.timerStatus = STATUSES[status];
  timer.countdownID = clearInterval(timer.countdownID);
  timer.remaining = timer.pomoDuration;
  timer.pomoCount = 0;
};
