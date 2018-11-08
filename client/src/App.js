/*global chrome*/

import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import TimerDisplay from './components/TimerDisplay';
import TimerButton from './components/TimerButton';

class App extends Component {
  state = {
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
    this.state.background.toggleTimer();
  };

  resetTimer = () => {
    this.state.background.resetTimer();
  };

  render() {
    const { timerDisplay, timerStatus, pomoCounter } = this.state;
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
