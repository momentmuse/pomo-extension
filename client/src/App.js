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
    timerDisplay: moment.duration(25, 'minutes'),
    timerStatus: STATUSES.NOT_SET,
    countdown: null,
    pomoCounter: 0
  };

  // componentDidMount() {
  //   this.setState({
  //     timerDisplay: this.state.pomoDuration
  //   });
  // }

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
    // if (this.state.timerDisplay);

    const timerDisplay = moment.duration(this.state.timerDisplay);
    timerDisplay.subtract(1, 'second');

    this.setState({ timerDisplay });
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
