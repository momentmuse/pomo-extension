import React, { Component } from 'react';
import BlockUrl from './BlockUrl';

class BlockList extends Component {
  renderBlocked = blockedURLs => {
    return blockedURLs.map(obj => (
      <BlockUrl obj={obj} handleRemove={this.props.handleRemove} />
    ));
  };

  render() {
    const { blockedURLs } = this.props;
    return (
      <div>
        <h3>Blocked Websites</h3>
        <ul>{this.renderBlocked(blockedURLs)}</ul>
      </div>
    );
  }
}

export default BlockList;
