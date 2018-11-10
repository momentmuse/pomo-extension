import React from 'react';

const BlockList = props => {
  return (
    <div>
      <h1>BlockList works!</h1>
      <p>Items in List: {props.blockedURLs.length}</p>
    </div>
  );
};

export default BlockList;
