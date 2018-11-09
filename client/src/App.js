/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import TimerDisplay from './components/TimerDisplay';
import TimerButton from './components/TimerButton';
import TimerConfig from './components/TimerConfig';

class App extends Component {
  state = {
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
    this.state.background.resetTimer('NOT_SET');
  };

  // openOptions = () => {
  //   this.state.background.openOptions();
  // };

  blockCurrentTab = () => {
    console.log('👾 Blocking the current tab! Wooo!');
    this.state.background.blockCurrentTab();
  };

  render() {
    const { timer } = this.state.background;
    return (
      <div className="App">
        <TimerConfig
          openOptions={this.openOptions}
          blockCurrentTab={this.blockCurrentTab}
        />
        <p>
          Pomo{' '}
          <span role="img" aria-label="tomato and clock emoji">
            🍅 ⏰
          </span>
          Pomo Counter: {timer.pomoCount}
        </p>
        <TimerDisplay
          timerDisplay={timer.remaining}
          timerStatus={timer.timerStatus}
          pomoCount={timer.pomoCount}
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
