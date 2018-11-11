/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import TimerDisplay from './components/Timer/TimerDisplay';
import TimerButton from './components/Timer/TimerButton';
import TimerConfig from './components/Timer/TimerConfig';
import BlockForm from './components/Options/BlockForm';

class App extends Component {
  state = {
    display: 'timer',
    background: chrome.extension.getBackgroundPage()
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(this.state);
    }, 500);
  }

  toggleTimer = () => {
    this.state.background.toggleTimer();
  };

  resetTimer = () => {
    this.state.background.resetTimer('NOT_SET');
  };

  toggleOptions = () => {
    this.state.display === 'timer'
      ? this.setState({
          display: 'options'
        })
      : this.setState({
          display: 'timer'
        });
  };

  // TODO: Integrate Block Current tab
  // blockCurrentTab = () => {
  // console.log('👾 Blocking the current tab! Wooo!');
  // this.state.background.blockCurrentTab();
  // };

  render() {
    const { timer } = this.state.background;
    return (
      <div className="App">
        <TimerConfig
          toggleOptions={this.toggleOptions}
          blockCurrentTab={this.blockCurrentTab}
          display={this.state.display}
          timerStatus={timer.timerStatus}
          pomoCount={timer.pomoCount}
        />

        {this.state.display === 'timer' ? (
          <div className="app-timer">
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
            <BlockForm />
          </div>
        )}
      </div>
    );
  }
}

export default App;
