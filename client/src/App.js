import React, { Component } from 'react';
import moment from 'moment';
import STATUSES from './timer-status';
import './App.css';
import Timer from './components/Timer';
import TimerButton from './components/TimerButton';

class App extends Component {
  state = {
    pomoDuration: moment.duration(25, 'minutes'),
    shortBreakDuration: moment.duration(5, 'minutes'),
    longBreakDuration: moment.duration(30, 'minutes'),
    timerDisplay: moment.duration(1, 'minutes'),
    timerStatus: STATUSES.NOT_SET,
    countdown: null,
    pomoCounter: 0
  };

  toggleTimer = () => {
    if (this.state.timerStatus !== 'POMO_RUNNING') {
      this.setState({
        timerStatus: STATUSES.POMO_RUNNING,
        countdown: setInterval(this.reduceTimer, 1000)
      });
    } else {
      clearInterval(this.countdown);
      this.setState({
        timerStatus: STATUSES.POMO_PAUSED,
        countdown: clearInterval(this.state.countdown)
      });
    }
  };

  reduceTimer = () => {
    const timerFinished =
      this.state.timerDisplay.get('minutes') === 0 &&
      this.state.timerDisplay.get('minutes') === 0;

    if (timerFinished) {
      this.setState({
        countdown: clearInterval(this.state.countdown)
      });
      this.endTimer();
      return;
    }

    const timerDisplay = moment.duration(this.state.timerDisplay);
    timerDisplay.subtract(1, 'second');

    this.setState({ timerDisplay });
  };

  endTimer = () => {
    const { pomoDuration, pomoCounter, timerStatus } = this.state;

    if (pomoCounter === 4) {
      this.setState({
        timerStatus: STATUSES.POMO_COMPLETE,
        pomoCounter: 0
      });
    }

    if (timerStatus === 'BREAK_RUNNING') {
      this.setState({
        timerDisplay: pomoDuration
      });
      this.toggleTimer();
    }

    if (timerStatus === 'POMO_RUNNING') {
      this.runBreak();
    }
  };

  runBreak = () => {
    let { pomoCounter, shortBreakDuration, longBreakDuration } = this.state;

    pomoCounter < 3
      ? this.setState({
          timerDisplay: shortBreakDuration
        })
      : this.setState({
          timerDisplay: longBreakDuration
        });

    console.log('break is running! yay!!!', this.state.timerDisplay);

    this.setState({
      timerStatus: STATUSES.BREAK_RUNNING,
      countdown: setInterval(this.reduceTimer, 1000),
      pomoCounter: ++pomoCounter
    });
  };

  render() {
    const { timerDisplay, timerStatus } = this.state;
    return (
      <div className="App">
        <p>
          Pomo{' '}
          <span role="img" aria-label="tomato and clock emoji">
            🍅 ⏰
          </span>
        </p>
        <Timer timerDisplay={timerDisplay} />
        <TimerButton toggleTimer={this.toggleTimer} timerStatus={timerStatus} />
      </div>
    );
  }
}

export default App;
