/*global chrome*/

var timerDisp = {
  count: 0
};

setInterval(() => {
  console.log('yay it works 👾', timerDisp.count);
  timerDisp.count++;
}, 1000);

console.log('-----', window);
