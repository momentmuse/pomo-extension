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
    pomoCounter: 0
  };

  toggleTimer = () => {
    this.setState({
      timerStatus: STATUSES.POMO_RUNNING
    });
    console.log('🎉 here is ths timerStatus', this.state.timerStatus);
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
