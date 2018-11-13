import React from 'react';
import { Button, List, Image } from 'semantic-ui-react';

const BlockUrl = props => {
  return (
    <List.Item>
      <List.Content floated="right">
        <Button
          circular
          size="tiny"
          icon="trash alternate"
          onClick={() => {
            props.handleRemove(props.obj.id);
          }}
        />
      </List.Content>
      <Image avatar src="https://image.flaticon.com/icons/svg/877/877814.svg" />
      <List.Content>{props.obj.title}</List.Content>
    </List.Item>
  );
};

export default BlockUrl;
