import React from 'react';

const TimerDisplay = props => {
  const padLeft = num => {
    return num < 10 ? `0${num}` : num;
  };

  const { timerStatus, timerDisplay, pomoCount } = props;
  const minutes = timerDisplay.get('minutes');
  const seconds = timerDisplay.get('seconds');

  return (
    <React.Fragment>
      <h1>{timerStatus}</h1>
      <h2>{`${padLeft(minutes)}:${padLeft(seconds)}`}</h2>
      {timerStatus === 'TIMER_RUNNING' && (
        <h2>{pomoCount % 2 === 0 ? 'Study! 📖' : 'Take a break ☕️'}</h2>
      )}
      {timerStatus === 'POMO_COMPLETE' && <h1>'Well done! 🍅'</h1>}
    </React.Fragment>
  );
};

export default TimerDisplay;
