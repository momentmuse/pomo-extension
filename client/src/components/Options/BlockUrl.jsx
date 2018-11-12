import React from 'react';
import { Button } from 'semantic-ui-react';

const BlockUrl = props => {
  const deleteButtonStyle = {
    marginRight: '10px'
  };

  return (
    <li>
      {props.obj.title}
      <Button
        circular
        icon="trash alternate"
        onClick={() => {
          props.handleRemove(props.obj.id);
        }}
        style={deleteButtonStyle}
      />
    </li>
  );
};

export default BlockUrl;
