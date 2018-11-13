import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import './TimerButton.css';

const TimerButton = props => {
  const { toggleTimer, resetTimer, timerStatus } = props;
  return (
    <Container textAlign="center" className="timer-button">
      <Button.Group fluid>
        {timerStatus === 'TIMER_RUNNING' ? (
          <Button
            negative
            size="large"
            content="Pause"
            icon="pause"
            labelPosition="left"
            onClick={toggleTimer}
            disabled={timerStatus === 'POMO_COMPLETE' ? true : false}
          />
        ) : (
          <Button
            positive
            size="large"
            content="Start"
            icon="play"
            labelPosition="left"
            onClick={toggleTimer}
            disabled={timerStatus === 'POMO_COMPLETE' ? true : false}
          />
        )}
        <Button.Or />
        <Button
          size="large"
          content="Reset"
          icon="repeat"
          labelPosition="right"
          onClick={resetTimer}
        />
      </Button.Group>
    </Container>
  );
};

export default TimerButton;
