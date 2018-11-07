import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import Timer from './components/Timer';
import STATUSES from './timer-states';

class App extends Component {
  state = {
    pomoDuration: moment.duration(25, 'minutes'),
    shortBreakDuration: moment.duration(5, 'minutes'),
    longBreakDuration: moment.duration(30, 'minutes'),
    timerStatus: STATUSES.NOT_SET,
    pomoCounter: 0
  };

  render() {
    let { pomoDuration } = this.state;
    return (
      <div className="App">
        <p>
          Pomo{' '}
          <span role="img" aria-label="tomato and clock emoji">
            🍅 ⏰
          </span>
        </p>
        <Timer pomoDuration={pomoDuration} />
      </div>
    );
  }
}

export default App;
