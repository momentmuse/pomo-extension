import React, { Component } from 'react';

class Timer extends Component {
  padLeft = num => {
    return num < 10 ? `0${num}` : num;
  };

  render() {
    let { pomoDuration } = this.props;
    let minutes = pomoDuration.get('minutes');
    let seconds = pomoDuration.get('seconds');
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
