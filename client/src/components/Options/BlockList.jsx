import React, { Component } from 'react';
import BlockUrl from './BlockUrl';

class BlockList extends Component {
  renderBlocked = blockedURLs => {
    return blockedURLs.map(obj => (
      <li>
        <BlockUrl title={obj.title} />
      </li>
    ));
  };

  render() {
    const { blockedURLs } = this.props;
    return (
      <div>
        <h3>BlockList works!</h3>
        <p>Items in List: {blockedURLs.length}</p>
        <ul>{this.renderBlocked(blockedURLs)}</ul>
      </div>
    );
  }
}

export default BlockList;
