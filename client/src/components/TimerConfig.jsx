import React from 'react';

const TimerConfig = props => {
  const { openOptions, blockCurrentTab } = props;
  return (
    <React.Fragment>
      <button onClick={blockCurrentTab}>Block!</button>
      <button onClick={openOptions}>Options</button>
    </React.Fragment>
  );
};

export default TimerConfig;
