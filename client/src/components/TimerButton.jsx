import React, { Component } from 'react';

const TimerButton = props => {
  const { toggleTimer, timerStatus } = props;
  return (
    <button onClick={toggleTimer}>
      {timerStatus === 'TIMER_PAUSED' ? 'Pause' : 'Start'}
    </button>
  );
};

export default TimerButton;
