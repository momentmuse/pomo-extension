import React from 'react';
import { Button } from 'semantic-ui-react';

const TimerButton = props => {
  const { toggleTimer, resetTimer, timerStatus } = props;
  return (
    <div>
      <Button.Group>
        {timerStatus === 'TIMER_RUNNING' ? (
          <Button
            negative
            content="Pause"
            icon="pause"
            labelPosition="left"
            onClick={toggleTimer}
            disabled={timerStatus === 'POMO_COMPLETE' ? true : false}
          />
        ) : (
          <Button
            positive
            content="Start"
            icon="play"
            labelPosition="left"
            onClick={toggleTimer}
            disabled={timerStatus === 'POMO_COMPLETE' ? true : false}
          />
        )}
        <Button.Or />
        <Button
          content="Cancel"
          icon="stop circle"
          labelPosition="right"
          onClick={resetTimer}
        />
      </Button.Group>
    </div>
  );
};

export default TimerButton;
