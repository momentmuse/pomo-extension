import React from 'react';
import { Label, Image } from 'semantic-ui-react';

const TimerDisplay = props => {
  const padLeft = num => {
    return num < 10 ? `0${num}` : num;
  };

  const { timerStatus, timerDisplay } = props;
  const minutes = timerDisplay.get('minutes');
  const seconds = timerDisplay.get('seconds');

  const getDialog = props => {
    if (timerStatus === 'POMO_COMPLETE') {
      return 'Never put off until tomorrow what you can do the day after tomorrow.';
    } else if (
      (timerStatus === 'TIMER_RUNNING' || timerStatus === 'TIMER_PAUSED') &&
      props.pomoCount % 2 === 0
    ) {
      return 'I love deadlines. I like the whooshing sound they make as they fly by.';
    } else if (props.pomoCount % 2 !== 0) {
      return 'Time you enjoy wasting is not wasted time.';
    } else {
      return 'People say nothing is impossible, but I do nothing every day.';
    }
  };

  return (
    <React.Fragment>
      {timerStatus === 'POMO_COMPLETE' ? (
        <h1>
          Pomo complete!{' '}
          <Image
            avatar
            src="https://image.flaticon.com/icons/svg/877/877814.svg"
          />
        </h1>
      ) : (
        <h1>{`${padLeft(minutes)}:${padLeft(seconds)}`}</h1>
      )}
      <Label basic pointing>
        {getDialog(props)}
      </Label>
    </React.Fragment>
  );
};

export default TimerDisplay;
