import React from 'react';

const BlockList = props => {
  return (
    <div>
      <h1>BlockList works!</h1>
      {props.blockedURLs}
    </div>
  );
};

export default BlockList;
