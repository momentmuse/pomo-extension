import React from 'react';

const TimerConfig = props => {
  const {
    toggleOptions,
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
      <button onClick={toggleOptions} disabled={studyMode ? true : false}>
        {display === 'timer' ? 'Options' : 'Timer'}
      </button>
    </React.Fragment>
  );
};

export default TimerConfig;
