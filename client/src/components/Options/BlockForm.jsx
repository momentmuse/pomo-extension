/*global chrome*/
import React, { Component } from 'react';
import BlockList from './BlockList';

class BlockForm extends Component {
  state = {
    urlString: '',
    blockedURLs: []
  };

  componentDidMount() {
    chrome.storage.sync.get(['blockedURLs'], data => {
      this.setState({
        blockedURLs: data.blockedURLs || []
      });
    });
  }

  handleChange = e => {
    const url = e.target.value;
    this.setState({
      urlString: url
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newURL = this.createURL();

    this.setState(state => {
      return {
        blockedURLs: [newURL, ...state.blockedURLs]
      };
    }, this.persistBlockList);
  };

  persistBlockList = () => {
    const blockedURLs = this.state.blockedURLs.slice();
    try {
      chrome.storage.sync.set({ blockedURLs }, () => {
        console.log(`⬇️ Saved urls ${blockedURLs} to sync storage`);
      });
    } catch (e) {
      console.log('🚫 Something went wrong while saving URLs!', e);
    }
    this.setState({
      urlString: ''
    });
  };

  createURL = () => {
    return {
      url: this.editString(this.state.urlString),
      id: Date.now()
    };
  };

  editString = url => {
    // this will only work with full URLs, copy pasted from browser
    let frontTrim = url.substring(url.indexOf(':'));
    const index = frontTrim.indexOf('/', 3) + 1;
    return '*' + frontTrim.substring(0, index) + '*';
  };

  render() {
    const { urlString, blockedURLs } = this.state;

    return (
      <div className="url-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={urlString}
            placeholder="no more distractions!"
          />
          <button type="submit">BOOM!</button>
        </form>
        <BlockList blockedURLs={blockedURLs} />
      </div>
    );
  }
}

export default BlockForm;
