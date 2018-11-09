import React from 'react';

const TimerConfig = props => {
  console.log('proppssss heee', props);
  const { toggleOptions, blockCurrentTab, display } = props;
  return (
    <React.Fragment>
      {!display && <button onClick={blockCurrentTab}>Block!</button>}
      <button onClick={toggleOptions}>{display ? 'Options' : 'Timer'}</button>
    </React.Fragment>
  );
};

export default TimerConfig;
