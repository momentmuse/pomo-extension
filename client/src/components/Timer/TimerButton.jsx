import React from 'react';
import { Button } from 'semantic-ui-react';

const TimerButton = props => {
  const { toggleTimer, resetTimer, timerStatus } = props;
  return (
    <div>
      {timerStatus !== 'POMO_COMPLETE' &&
        (timerStatus === 'TIMER_RUNNING' ? (
          <Button
            content="Pause"
            icon="pause"
            labelPosition="left"
            onClick={toggleTimer}
          />
        ) : (
          <Button
            content="Start"
            icon="play"
            labelPosition="left"
            onClick={toggleTimer}
          />
        ))}
      <Button
        content="Cancel"
        icon="stop circle"
        labelPosition="left"
        onClick={resetTimer}
      />
    </div>
  );
};

export default TimerButton;
