import React from 'react';
import { Button } from 'semantic-ui-react';
import './TimerButton.css';

const TimerButton = props => {
  const { toggleTimer, resetTimer, timerStatus } = props;
  return (
    <div className="timer-button">
      <Button.Group>
        {timerStatus === 'TIMER_RUNNING' ? (
          <Button
            negative
            size="big"
            content="Pause"
            icon="pause"
            labelPosition="left"
            onClick={toggleTimer}
            disabled={timerStatus === 'POMO_COMPLETE' ? true : false}
          />
        ) : (
          <Button
            positive
            size="big"
            content="Start"
            icon="play"
            labelPosition="left"
            onClick={toggleTimer}
            disabled={timerStatus === 'POMO_COMPLETE' ? true : false}
          />
        )}
        <Button.Or />
        <Button
          size="big"
          content="Reset"
          icon="repeat"
          labelPosition="right"
          onClick={resetTimer}
        />
      </Button.Group>
    </div>
  );
};

export default TimerButton;
