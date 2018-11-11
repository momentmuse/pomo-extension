/*global chrome*/

// IMPORTANT: background.js page is not compatible with let & const

var STATUSES = {
  NOT_SET: 'NOT_SET',
  TIMER_RUNNING: 'TIMER_RUNNING',
  TIMER_PAUSED: 'TIMER_PAUSED',
  POMO_COMPLETE: 'POMO_COMPLETE'
};

var timer = {
  pomoDuration: moment.duration(25, 'seconds'),
  shortBreakDuration: moment.duration(15, 'seconds'),
  longBreakDuration: moment.duration(20, 'seconds'),
  countdownID: null,
  remaining: moment.duration(25, 'seconds'),
  timerStatus: STATUSES.NOT_SET,
  pomoCount: 0
};

var blockedURLs;

var updateBlockedURLs = async () => {
  await chrome.storage.sync.get(['blockedURLs'], data => {
    blockedURLs = data.blockedURLs || [];
  });
};

updateBlockedURLs();

// TODO: Integrate Block Current tab
// var blockCurrentTab = () => {
//   console.log('lalalala 🎼');
// chrome.tabs.query ... may have to put into a content script?
// };

var blockRequest = details => {
  return { cancel: true };
};

var toggleBlockFilters = blockedURLs => {
  var request = chrome.webRequest.onBeforeRequest;
  var urls = blockedURLs.reduce((urls, obj) => {
    return (urls = [...urls, obj.url]);
  }, []);
  console.log('🚀 ---TCL--- 🚀 toggleBlockFilters -> urls', urls);

  timer.pomoCount % 2 === 0
    ? request.addListener(blockRequest, { urls }, ['blocking'])
    : request.removeListener(blockRequest);
};

var toggleTimer = () => {
  updateBlockedURLs();
  toggleBlockFilters(blockedURLs);

  if (timer.timerStatus !== 'TIMER_RUNNING') {
    timer.timerStatus = STATUSES.TIMER_RUNNING;
    timer.countdownID = setInterval(reduceTimer, 1000);
  } else {
    timer.countdownID = clearInterval(timer.countdownID);
    timer.timerStatus = STATUSES.TIMER_PAUSED;
  }
};

var reduceTimer = () => {
  var timerFinished =
    timer.remaining.get('minutes') === 0 &&
    timer.remaining.get('seconds') === 0;

  if (timerFinished) {
    timer.countdownID = clearInterval(timer.countdownID);
    ++timer.pomoCount;
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

var onTimerEnd = () => {
  updateBlockedURLs();
  toggleBlockFilters(blockedURLs);

  if (timer.pomoCount === 8) {
    resetTimer('POMO_COMPLETE');
  } else {
    setTimerCycle();
    toggleTimer();
  }
};

var setTimerCycle = () => {
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

var resetTimer = status => {
  chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  timer.timerStatus = STATUSES[status];
  timer.countdownID = clearInterval(timer.countdownID);
  timer.remaining = timer.pomoDuration;
  timer.pomoCount = 0;
};
