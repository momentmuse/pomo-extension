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
    timerStatus: STATUSES.NOT_SET,
    timer: null,
    pomoCounter: 0
  };

  toggleTimer = () => {
    if (this.state.timerStatus !== 'POMO_RUNNING') {
      this.setState({
        timerStatus: STATUSES.POMO_RUNNING,
        timer: setInterval(() => {
          this.reduceTimer('pomoDuration');
        }, 1000)
      });
    } else {
      clearInterval(this.timer);
      this.setState({
        timerStatus: STATUSES.POMO_PAUSED,
        timer: clearInterval(this.state.timer)
      });
    }
  };

  // reuse this code for the break timer countdown
  reduceTimer = duration => {
    const newTime = moment.duration(this.state[duration]);
    newTime.subtract(1, 'second');

    this.setState({
      [duration]: newTime
    });
  };

  render() {
    const { pomoDuration, timerStatus } = this.state;
    return (
      <div className="App">
        <p>
          Pomo{' '}
          <span role="img" aria-label="tomato and clock emoji">
            🍅 ⏰
          </span>
        </p>
        <Timer pomoDuration={pomoDuration} />
        <TimerButton toggleTimer={this.toggleTimer} timerStatus={timerStatus} />
      </div>
    );
  }
}

export default App;
