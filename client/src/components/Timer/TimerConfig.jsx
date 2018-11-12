import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const TimerConfig = props => {
  const {
    openOptions,
    openTimer,
    // blockCurrentTab,
    display,
    timerStatus,
    pomoCount
  } = props;

  const studyMode =
    (timerStatus === 'TIMER_RUNNING' || timerStatus === 'TIMER_PAUSED') &&
    pomoCount % 2 === 0;

  // TODO: Integrate Block Current tab
  // {display === 'options' && (
  //   <button onClick={blockCurrentTab}>Block!</button>
  // )}

  return (
    <React.Fragment>
      <Button
        animated="fade"
        onClick={openTimer}
        disabled={display === 'timer' ? true : false}
      >
        <Button.Content visible>Timer</Button.Content>
        <Button.Content hidden>
          <Icon name="stopwatch" />
        </Button.Content>
      </Button>
      <Button
        animated="fade"
        onClick={openOptions}
        disabled={studyMode || display === 'options' ? true : false}
      >
        <Button.Content visible>Options</Button.Content>
        <Button.Content hidden>
          <Icon name="options" />
        </Button.Content>
      </Button>
    </React.Fragment>
  );
};

export default TimerConfig;
