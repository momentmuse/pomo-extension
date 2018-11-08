import React, { Component } from 'react';
import moment from 'moment';
import STATUSES from './timer-status';
import './App.css';
import Timer from './components/Timer';
import TimerButton from './components/TimerButton';

class App extends Component {
  state = {
    pomoDuration: moment.duration(6, 'seconds'),
    shortBreakDuration: moment.duration(3, 'seconds'),
    longBreakDuration: moment.duration(10, 'seconds'),
    timerDisplay: moment.duration(6, 'seconds'),
    timerStatus: STATUSES.NOT_SET,
    countdown: null,
    pomoCounter: 0
  };

  toggleTimer = () => {
    if (this.state.timerStatus !== 'TIMER_RUNNING') {
      this.setState({
        timerStatus: STATUSES.TIMER_RUNNING,
        countdown: setInterval(this.reduceTimer, 1000)
      });
    } else {
      clearInterval(this.countdown);
      this.setState({
        timerStatus: STATUSES.TIMER_PAUSED,
        countdown: clearInterval(this.state.countdown)
      });
    }
  };

  resetTimer = () => {
    this.setState({
      timerStatus: STATUSES.NOT_SET,
      timerDisplay: this.state.pomoDuration,
      countdown: clearInterval(this.state.countdown),
      pomoCounter: 0
    });
  };

  reduceTimer = () => {
    let { pomoCounter } = this.state;

    const timerFinished =
      this.state.timerDisplay.get('minutes') === 0 &&
      this.state.timerDisplay.get('seconds') === 0;

    if (timerFinished) {
      this.setState({
        countdown: clearInterval(this.state.countdown),
        pomoCounter: ++pomoCounter,
        timerStatus: STATUSES.NOT_SET
      });
      this.onTimerEnd();
      return;
    }

    const timerDisplay = moment.duration(this.state.timerDisplay);
    timerDisplay.subtract(1, 'second');
    this.setState({ timerDisplay });
  };

  onTimerEnd = () => {
    const { pomoCounter } = this.state;

    if (pomoCounter === 8) {
      this.completePomo();
    } else {
      this.setTimerCycle();
      this.toggleTimer();
    }
  };

  setTimerCycle = () => {
    let {
      pomoCounter,
      pomoDuration,
      shortBreakDuration,
      longBreakDuration
    } = this.state;

    if (pomoCounter % 2 === 0) {
      this.setState({
        timerDisplay: pomoDuration
      });
    } else {
      pomoCounter < 7
        ? this.setState({
            timerDisplay: shortBreakDuration
          })
        : this.setState({
            timerDisplay: longBreakDuration
          });
    }
  };

  completePomo = () => {
    const { pomoDuration } = this.state;
    this.setState({
      timerStatus: STATUSES.POMO_COMPLETE,
      timerDisplay: pomoDuration,
      pomoCounter: 0
    });
    return;
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
        <Timer
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
