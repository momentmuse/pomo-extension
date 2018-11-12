import React, { Component } from 'react';
import BlockUrl from './BlockUrl';
import { List } from 'semantic-ui-react';

class BlockList extends Component {
  renderBlocked = blockedURLs => {
    return blockedURLs.map(obj => (
      <BlockUrl obj={obj} handleRemove={this.props.handleRemove} />
    ));
  };

  render() {
    const { blockedURLs } = this.props;
    return (
      <React.Fragment>
        <List divided verticalAlign="middle">
          {this.renderBlocked(blockedURLs)}
        </List>
      </React.Fragment>
    );
  }
}

export default BlockList;
