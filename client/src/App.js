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
    // popups (index.html, the html that this class App is appended to) do not persist, they are destroyed and reconstructed with each open/close
    // I need to store the state on a background script in the browser (runs while Chrome is running), which is like a temporary redux store, or single source of truth
    // the background page also contains much of the logic and handlers of the timer
    background: chrome.extension.getBackgroundPage()
    // background is equal to a window object
  };

  componentDidMount() {
    // even though the timer object in background.js is being mutated, the app is not rerendering
    // this is a hacky way of solving the non re-rendering problem
    setInterval(
      () =>
        this.setState({
          background: chrome.extension.getBackgroundPage()
        }),
      500
    );
    // this.setState({
    //   background: chrome.extension.getBackgroundPage()
    // });
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

  blockCurrentTab = () => {
    console.log('👾 Blocking the current tab! Wooo!');
    // this.state.background.blockCurrentTab();
  };

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
