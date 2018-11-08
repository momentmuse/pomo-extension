/*global chrome*/

let count = 0;

setInterval(() => {
  console.log('yay it works 👾', count);
  count++;
}, 1000);

// chrome.browserAction.getPopup(object, () => {
//   console.log('lalalalala', object);
// });
