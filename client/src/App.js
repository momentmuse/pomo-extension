/*global chrome*/

import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import TimerDisplay from './components/TimerDisplay';
import TimerButton from './components/TimerButton';

class App extends Component {
  // state is not changing even though the background page values are changing
  state = {
    // countdownID: chrome.extension.getBackgroundPage().timer.countdownID,
    // timerDisplay: chrome.extension.getBackgroundPage().timer.remaining,
    // timerStatus: chrome.extension.getBackgroundPage().timer.timerStatus,
    // pomoCounter: chrome.extension.getBackgroundPage().timer.pomoCount,
    background: chrome.extension.getBackgroundPage()
  };

  // state changes and the app rerenders when the window is closed and opened
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
    this.state.background.toggleTimer();
  };

  resetTimer = () => {
    this.state.background.resetTimer('NOT_SET');
  };

  render() {
    const { timer } = this.state.background;
    return (
      <div className="App">
        <p>
          Pomo{' '}
          <span role="img" aria-label="tomato and clock emoji">
            🍅 ⏰
          </span>
          PomoCounter: {timer.pomoCount}
        </p>
        <TimerDisplay
          timerDisplay={timer.remaining}
          timerStatus={timer.timerStatus}
          pomoCounter={timer.pomoCount}
        />
        <TimerButton
          toggleTimer={this.toggleTimer}
          resetTimer={this.resetTimer}
          timerStatus={timer.timerStatus}
        />
      </div>
    );
  }
}

export default App;
