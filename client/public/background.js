/*global chrome*/

// IMPORTANT: background.js page is not compatible with let & const

var STATUSES = {
  NOT_SET: 'NOT_SET',
  TIMER_RUNNING: 'TIMER_RUNNING',
  TIMER_PAUSED: 'TIMER_PAUSED',
  POMO_COMPLETE: 'POMO_COMPLETE'
};

var timer = {
  pomoDuration: moment.duration(25, 'minutes'),
  shortBreakDuration: moment.duration(5, 'minutes'),
  longBreakDuration: moment.duration(25, 'minutes'),
  countdownID: null,
  remaining: moment.duration(25, 'minutes'),
  timerStatus: STATUSES.NOT_SET,
  pomoCount: 0
};

// TODO: Integrate Block Current tab
// var blockCurrentTab = () => {
//   console.log('lalalala 🎼');
// chrome.tabs.query ... may have to put into a content script?
// };

var blockedURLs;

var getBlockedURLsFromStorage = async () => {
  await chrome.storage.sync.get(['blockedURLs'], data => {
    blockedURLs = data.blockedURLs || [];
    return;
  });
};

getBlockedURLsFromStorage();

var blockRequest = details => {
  return { cancel: true };
};

var setBlockFilters = () => {
  var request = chrome.webRequest.onBeforeRequest;
  var studyMode = timer.pomoCount % 2 === 0;
  var urls = blockedURLs.map(urlObj => urlObj.url);

  // this creates one blockRequest for an array of urls (addListener) or removes the previously set blockRequest (removeListener)
  studyMode
    ? request.addListener(blockRequest, { urls }, ['blocking'])
    : request.removeListener(blockRequest);
};

var toggleTimer = () => {
  // this sets filters on clicking start for the first time
  if (timer.pomoCount === 0 && timer.timerStatus === 'NOT_SET') {
    setBlockFilters(blockedURLs);
  }

  if (timer.timerStatus !== 'TIMER_RUNNING') {
    timer.timerStatus = STATUSES.TIMER_RUNNING;
    timer.countdownID = setInterval(reduceTimer, 1000);
  } else {
    timer.countdownID = clearInterval(timer.countdownID);
    timer.timerStatus = STATUSES.TIMER_PAUSED;
  }
};

var reduceTimer = () => {
  checkIfFinished();

  var timerDisplay = moment.duration(timer.remaining);
  timerDisplay.subtract(1, 'second');
  timer.remaining = timerDisplay;
};

var checkIfFinished = () => {
  var timerFinished =
    timer.remaining.get('minutes') === 0 &&
    timer.remaining.get('seconds') === 0;

  if (timerFinished) {
    timer.countdownID = clearInterval(timer.countdownID);
    // This syntax is a little obscure
    ++timer.pomoCount;
    // this line causes the next cycle to auto-run
    // delete for manual initiation (deleting this will break the block functionality)
    timer.timerStatus = STATUSES.NOT_SET;
    onTimerEnd();
  }
};

var onTimerEnd = () => {
  setBlockFilters(blockedURLs);

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

// Generally pretty good!
// If I had time to refactor it, I would try to create
// a 'thing' (object / module / class) that handles
// blocking, timer.
// Right now it was difficult to understand because generally
// the functions seem to do more than what I expected them to do.
// And I had to reference a few other functions to understand
// what was happening.
// It might be unfamiliarity with the code, but encapsulating
// that behaviour into a well behaved thing with meaningful
// methods might be easier to understand on first glance.
// It would also make your code more flexible (for example if you introduce another scheduler)
