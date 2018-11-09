import React from 'react';

const TimerButton = props => {
  const { toggleTimer, resetTimer, timerStatus } = props;
  return (
    <React.Fragment>
      {timerStatus !== 'POMO_COMPLETE' && (
        <button onClick={toggleTimer}>
          {timerStatus === 'TIMER_RUNNING' ? 'Pause' : 'Start'}
        </button>
      )}
      <button onClick={resetTimer}>Reset</button>
    </React.Fragment>
  );
};

export default TimerButton;
