import React, { Component } from 'react';

class Timer extends Component {
  padLeft = num => {
    return num < 10 ? `0${num}` : num;
  };

  render() {
    const { timerDisplay } = this.props;
    const minutes = timerDisplay.get('minutes');
    const seconds = timerDisplay.get('seconds');
    return (
      <h2>
        {`
        ${this.padLeft(minutes)}:${this.padLeft(seconds)}
        `}
      </h2>
    );
  }
}

export default Timer;
