import React, { Component } from 'react';

const TimerButton = props => {
  const { toggleTimer, timerStatus } = props;
  return (
    <button onClick={toggleTimer}>
      {timerStatus === 'NOT_SET' || timerStatus === 'POMO_PAUSED'
        ? 'Start'
        : 'Pause'}
    </button>
  );
};

export default TimerButton;
