import React, { Component } from 'react';

class Timer extends Component {
  padLeft = num => {
    return num < 10 ? `0${num}` : num;
  };

  render() {
    const { pomoDuration } = this.props;
    const minutes = pomoDuration.get('minutes');
    const seconds = pomoDuration.get('seconds');
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
