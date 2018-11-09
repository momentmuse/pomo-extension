/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import TimerDisplay from './components/Timer/TimerDisplay';
import TimerButton from './components/Timer/TimerButton';
import TimerConfig from './components/Timer/TimerConfig';
import BlockForm from './components/Options/BlockForm';
import BlockList from './components/Options/BlockList';

class App extends Component {
  state = {
    display: 0,
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

  toggleOptions = () => {
    this.state.display === 0
      ? this.setState({
          display: 1
        })
      : this.setState({
          display: 0
        });
  };

  blockCurrentTab = () => {
    console.log('👾 Blocking the current tab! Wooo!');
    this.state.background.blockCurrentTab();
  };

  render() {
    const { timer } = this.state.background;
    return (
      <div className="App">
        {this.state.display === 0 ? (
          <div className="app-timer">
            <TimerConfig
              toggleOptions={this.toggleOptions}
              blockCurrentTab={this.blockCurrentTab}
              display={this.state.display}
            />
            🍅 Pomo Counter: {timer.pomoCount} ⏰
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
        ) : (
          <div className="app-options">
            <TimerConfig
              toggleOptions={this.toggleOptions}
              blockCurrentTab={this.blockCurrentTab}
            />
            <BlockForm />
            <BlockList />
          </div>
        )}
      </div>
    );
  }
}

export default App;
