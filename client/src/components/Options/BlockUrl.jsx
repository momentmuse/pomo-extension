import React from 'react';
import { Button, List, Image } from 'semantic-ui-react';

const BlockUrl = props => {
  return (
    <List.Item>
      <List.Content floated="right">
        <Button
          content="Delete"
          size="tiny"
          onClick={() => {
            props.handleRemove(props.obj.id);
          }}
        />
      </List.Content>
      <Image avatar />
      <List.Content>{props.obj.title}</List.Content>
    </List.Item>
  );
};

export default BlockUrl;
