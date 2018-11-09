import React from 'react';

const TimerConfig = props => {
  const { toggleOptions, blockCurrentTab, display } = props;
  console.log('🚀 ---TCL--- 🚀 display', display);
  return (
    <React.Fragment>
      {display === 1 && <button onClick={blockCurrentTab}>Block!</button>}
      <button onClick={toggleOptions}>Options</button>
    </React.Fragment>
  );
};

export default TimerConfig;
