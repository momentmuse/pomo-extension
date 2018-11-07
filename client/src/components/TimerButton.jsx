import React, { Component } from 'react';

const TimerButton = props => {
  const { toggleTimer, resetTimer, timerStatus } = props;
  return (
    <React.Fragment>
      <button onClick={toggleTimer}>
        {timerStatus === 'TIMER_RUNNING' ? 'Pause' : 'Start'}
      </button>
      <button onClick={resetTimer}>Reset</button>
    </React.Fragment>
  );
};

export default TimerButton;
