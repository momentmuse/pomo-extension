/*global chrome*/

import React, { Component } from 'react';
import moment from 'moment';
import STATUSES from './timer-status';
import './App.css';
import TimerDisplay from './components/TimerDisplay';
import TimerButton from './components/TimerButton';

class App extends Component {
  state = {
    pomoDuration: moment.duration(6, 'seconds'),
    shortBreakDuration: moment.duration(3, 'seconds'),
    longBreakDuration: moment.duration(10, 'seconds'),
    // countdownID: null,
    // timerDisplay: moment.duration(6, 'seconds'),
    // timerStatus: STATUSES.NOT_SET,
    // pomoCounter: 0,
    countdownID: chrome.extension.getBackgroundPage().timer.countdownID,
    timerDisplay: chrome.extension.getBackgroundPage().timer.remaining,
    timerStatus: chrome.extension.getBackgroundPage().timer.timerStatus,
    pomoCounter: chrome.extension.getBackgroundPage().timer.pomoCount,
    background: chrome.extension.getBackgroundPage()
  };

  componentDidMount() {
    setInterval(
      () =>
        this.setState({
          background: chrome.extension.getBackgroundPage()
        }),
      500
    );
  }

  toggleTimer = () => {
    const { background } = this.state;
    if (this.state.timerStatus !== 'TIMER_RUNNING') {
      background.timer.timerStatus = background.STATUSES.TIMER_RUNNING;
      background.timer.countdownID = setInterval(this.reduceTimer, 1000);
    } else {
      background.timer.countdownID = clearInterval(
        background.timer.countdownID
      );
      background.timer.timerStatus = background.STATUSES.TIMER_PAUSED;
    }
  };

  // toggleTimer = () => {
  //   if (this.state.timerStatus !== 'TIMER_RUNNING') {
  //     this.setState({
  //       timerStatus: STATUSES.TIMER_RUNNING,
  //       countdownID: setInterval(this.reduceTimer, 1000)
  //     });
  //   } else {
  //     clearInterval(this.countdownID);
  //     this.setState({
  //       timerStatus: STATUSES.TIMER_PAUSED,
  //       countdownID: clearInterval(this.state.countdownID)
  //     });
  //   }
  // };

  resetTimer = () => {
    const { background } = this.state;

    background.timer.timerStatus = background.STATUSES.NOT_SET;
    background.timer.countdownID = clearInterval(background.timer.countdownID);
    background.timer.remaining = this.state.pomoDuration;
    background.timer.pomoCount = 0;
  };

  // resetTimer = () => {
  //   this.setState({
  //     timerStatus: STATUSES.NOT_SET,
  //     timerDisplay: this.state.pomoDuration,
  //     countdownID: clearInterval(this.state.countdownID),
  //     pomoCounter: 0
  //   });
  // };

  reduceTimer = () => {
    const { background } = this.state;

    const timerFinished =
      background.timer.remaining.get('minutes') === 0 &&
      background.timer.remaining.get('seconds') === 0;

    if (timerFinished) {
      background.timer.countdownID = clearInterval(
        background.timer.countdownID
      );
      background.timer.pomoCount = ++background.timer.pomoCount;
      background.timer.timerStatus = background.STATUSES.NOT_SET;
      this.onTimerEnd();
      return;
    }

    const timerDisplay = moment.duration(background.timer.remaining);
    timerDisplay.subtract(1, 'second');
    background.timer.remaining = timerDisplay;
  };

  // reduceTimer = () => {
  //   let { pomoCounter } = this.state;

  //   const timerFinished =
  //     this.state.timerDisplay.get('minutes') === 0 &&
  //     this.state.timerDisplay.get('seconds') === 0;

  //   if (timerFinished) {
  //     this.setState({
  //       countdownID: clearInterval(this.state.countdownID),
  //       pomoCounter: ++pomoCounter,
  //       timerStatus: STATUSES.NOT_SET
  //     });
  //     this.onTimerEnd();
  //     return;
  //   }

  //   const timerDisplay = moment.duration(this.state.timerDisplay);
  //   timerDisplay.subtract(1, 'second');
  //   this.setState({ timerDisplay });
  // };

  onTimerEnd = () => {
    const { timer } = this.state.background;

    if (timer.pomoCount === 8) {
      this.completePomo();
    } else {
      this.setTimerCycle();
      this.toggleTimer();
    }
  };

  // onTimerEnd = () => {
  //   const { pomoCounter } = this.state;

  //   if (pomoCounter === 8) {
  //     this.completePomo();
  //   } else {
  //     this.setTimerCycle();
  //     this.toggleTimer();
  //   }
  // };

  setTimerCycle = () => {
    const { timer } = this.state.background;
    const { pomoDuration, shortBreakDuration, longBreakDuration } = this.state;

    if (timer.pomoCount % 2 === 0) {
      timer.remaining = pomoDuration;
    } else {
      timer.pomoCount < 7
        ? (timer.remaining = shortBreakDuration)
        : (timer.remaining = longBreakDuration);
    }
  };

  // setTimerCycle = () => {
  //   let {
  //     pomoCounter,
  //     pomoDuration,
  //     shortBreakDuration,
  //     longBreakDuration
  //   } = this.state;

  //   if (pomoCounter % 2 === 0) {
  //     this.setState({
  //       timerDisplay: pomoDuration
  //     });
  //   } else {
  //     pomoCounter < 7
  //       ? this.setState({
  //           timerDisplay: shortBreakDuration
  //         })
  //       : this.setState({
  //           timerDisplay: longBreakDuration
  //         });
  //   }
  // };

  completePomo = () => {
    const { background } = this.state;

    background.timer.timerStatus = background.STATUSES.POMO_COMPLETE;
    clearInterval(background.timer.countdownID);
    background.timer.remaining = this.state.pomoDuration;
    background.timer.pomoCount = 0;
  };

  // completePomo = () => {
  //   const { pomoDuration } = this.state;
  //   this.setState({
  //     timerStatus: STATUSES.POMO_COMPLETE,
  //     timerDisplay: pomoDuration,
  //     pomoCounter: 0
  //   });
  //   return;
  // };

  render() {
    const { timerDisplay, timerStatus, pomoCounter, background } = this.state;
    return (
      <div className="App">
        <p>
          Pomo{' '}
          <span role="img" aria-label="tomato and clock emoji">
            🍅 ⏰
          </span>
          PomoCounter: {this.state.pomoCounter}
        </p>
        <TimerDisplay
          timerDisplay={timerDisplay}
          timerStatus={timerStatus}
          pomoCounter={pomoCounter}
        />
        <TimerButton
          toggleTimer={this.toggleTimer}
          resetTimer={this.resetTimer}
          timerStatus={timerStatus}
        />
      </div>
    );
  }
}

export default App;
