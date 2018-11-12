import React from 'react';

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
      {display === 'timer' ? (
        <button onClick={openOptions} disabled={studyMode ? true : false}>
          Options
        </button>
      ) : (
        <button onClick={openTimer}>Timer</button>
      )}
    </React.Fragment>
  );
};

export default TimerConfig;
