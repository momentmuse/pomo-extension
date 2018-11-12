/*global chrome*/
import React, { Component } from 'react';
import BlockList from './BlockList';

class BlockForm extends Component {
  state = {
    title: '',
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
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newURL = this.createURL();
    const blockedURLs = [newURL, ...this.state.blockedURLs];

    this.setState({ blockedURLs });
    this.persistBlockList(blockedURLs);
    // update blockedURLs on background (please refactor)
    this.props.background.getBlockedURLsFromStorage();
    // TODO: implement block from current tab
    // this.props.background.setBlockFilters();
  };

  handleRemove = id => {
    const blockedURLs = this.state.blockedURLs.filter(
      urlObj => urlObj.id !== id
    );

    this.setState({ blockedURLs });
    this.persistBlockList(blockedURLs);
    // update blockedURLs on background (please refactor)
    this.props.background.getBlockedURLsFromStorage();
  };

  persistBlockList = blockedURLs => {
    try {
      chrome.storage.sync.set({ blockedURLs }, () => {
        console.log(`⬇️ Saved urls ${blockedURLs} to sync storage`);
      });
    } catch (e) {
      console.log('🚫 Something went wrong while saving URLs!', e);
    }
    this.setState({
      title: '',
      urlString: ''
    });
  };

  createURL = () => {
    const { title, urlString } = this.state;
    return {
      id: Date.now(),
      title,
      url: this.editString(urlString)
    };
  };

  editString = url => {
    // this will only work with full URLs, copy pasted from browser
    let frontTrim = url.substring(url.indexOf(':'));
    const index = frontTrim.indexOf('/', 3) + 1;
    return '*' + frontTrim.substring(0, index) + '*';
  };

  render() {
    const { title, urlString, blockedURLs } = this.state;

    return (
      <div className="url-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            name="title"
            value={title}
            placeholder="site name"
          />
          <input
            type="text"
            onChange={this.handleChange}
            name="urlString"
            value={urlString}
            placeholder="url goes here!"
          />
          <button type="submit" disabled={!urlString || !title}>
            BOOM!
          </button>
        </form>
        <BlockList blockedURLs={blockedURLs} handleRemove={this.handleRemove} />
      </div>
    );
  }
}

export default BlockForm;
