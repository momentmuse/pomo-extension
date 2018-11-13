import React from 'react';
import { Label } from 'semantic-ui-react';

const TimerDisplay = props => {
  const padLeft = num => {
    return num < 10 ? `0${num}` : num;
  };

  const { timerStatus, timerDisplay } = props;
  const minutes = timerDisplay.get('minutes');
  const seconds = timerDisplay.get('seconds');

  // {(timerStatus === 'TIMER_RUNNING' || timerStatus === 'TIMER_PAUSED') && (
  //   <h3>{pomoCount % 2 === 0 ? 'Back to work! 📖' : 'Take a break ☕️'}</h3>
  //   )}

  return (
    <React.Fragment>
      <h1>{`${padLeft(minutes)}:${padLeft(seconds)}`}</h1>
      {(timerStatus === 'TIMER_RUNNING' || timerStatus === 'TIMER_PAUSED') &&
        props.pomoCount % 2 === 0 && (
          <Label basic pointing>
            I love deadlines. I like the whooshing sound they make as they fly
            by.
          </Label>
        )}
      {timerStatus === 'POMO_COMPLETE' && <h2>Well done! 🍅</h2>}
    </React.Fragment>
  );
};

export default TimerDisplay;
