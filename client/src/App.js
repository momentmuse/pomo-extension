/*global chrome*/

import React, { Component } from 'react';
import TimerDisplay from './components/Timer/TimerDisplay';
import TimerButton from './components/Timer/TimerButton';
import TimerImage from './components/Timer/TimerImage';
import ProgressBar from './components/Timer/ProgressBar';
import BlockForm from './components/Options/BlockForm';
import './App.css';
import { Grid, Menu } from 'semantic-ui-react';

class App extends Component {
  state = {
    display: 'timer',
    // if I had more time, I would set up an event listener and handler to track changes in background.js
    background: chrome.extension.getBackgroundPage()
  };

  // current mode of communication between App and background relies on reference to mutating the same object in memory--which undermines the design principles of React!
  // App.state is not set up to handle and reset state upon background mutation
  // thus, I need to repeatedly reset the state to force re-render
  componentDidMount() {
    setInterval(() => {
      this.setState(this.state);
    }, 300);
  }

  toggleTimer = () => {
    this.state.background.toggleTimer();
  };

  resetTimer = () => {
    this.state.background.resetTimer('NOT_SET');
  };

  openOptions = () => {
    this.setState({
      display: 'options'
    });
  };

  openTimer = () => {
    this.setState({
      display: 'timer'
    });
  };

  render() {
    const { timer } = this.state.background;
    const { display, background } = this.state;
    const studyMode =
      (timer.timerStatus === 'TIMER_RUNNING' ||
        timer.timerStatus === 'TIMER_PAUSED') &&
      timer.pomoCount % 2 === 0;
    return (
      <div className="App">
        <Menu tabular>
          <Menu.Item
            position="right"
            name="Timer"
            icon="stopwatch"
            active={display === 'timer'}
            onClick={this.openTimer}
          />
          <Menu.Item
            name="Options"
            active={display === 'options'}
            icon="options"
            disabled={studyMode}
            onClick={this.openOptions}
          />
        </Menu>

        {display === 'timer' ? (
          <React.Fragment>
            <ProgressBar
              timerStatus={timer.timerStatus}
              pomoCount={timer.pomoCount}
            />
            <Grid container centered columns={1}>
              <Grid.Row>
                <TimerImage
                  timerStatus={timer.timerStatus}
                  pomoCount={timer.pomoCount}
                />
              </Grid.Row>

              <Grid.Row>
                <TimerDisplay
                  timerDisplay={timer.remaining}
                  timerStatus={timer.timerStatus}
                  pomoCount={timer.pomoCount}
                />
              </Grid.Row>

              <Grid.Row>
                <TimerButton
                  toggleTimer={this.toggleTimer}
                  resetTimer={this.resetTimer}
                  timerStatus={timer.timerStatus}
                />
              </Grid.Row>
            </Grid>
          </React.Fragment>
        ) : (
          <Grid container centered columns={1}>
            <BlockForm background={background} />
          </Grid>
        )}
      </div>
    );
  }
}

export default App;
