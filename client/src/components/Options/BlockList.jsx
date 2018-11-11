import React, { Component } from 'react';
import BlockUrl from './BlockUrl';

class BlockList extends Component {
  handleClick = id => {
    console.log('id of website to be removed!', id);
  };

  renderBlocked = blockedURLs => {
    return blockedURLs.map(obj => (
      <li>
        <BlockUrl obj={obj} handleClick={this.handleClick} />
      </li>
    ));
  };

  render() {
    const { blockedURLs } = this.props;
    return (
      <div>
        <h3>Blocked Websites</h3>
        <p>Items in List: {blockedURLs.length}</p>
        <ul>{this.renderBlocked(blockedURLs)}</ul>
      </div>
    );
  }
}

export default BlockList;
