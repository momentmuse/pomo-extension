import React from 'react';

const BlockUrl = props => {
  return (
    <li>
      {props.obj.title}
      <button
        onClick={() => {
          props.handleClick(props.obj.id);
        }}
      >
        X
      </button>
    </li>
  );
};

export default BlockUrl;
