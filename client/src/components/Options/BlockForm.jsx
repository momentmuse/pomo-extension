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
      const savedURLs = data.blockedURLs;
      console.log('🎉 savedURLs!!! 🎉', savedURLs);
      this.setState({
        blockedURLs: savedURLs || []
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const newURL = {
      url: this.editURL(this.state.urlString),
      id: Date.now()
    };

    // console.log(
    //   '---blockedURLs in state before setting---',
    //   this.state.blockedURLs
    // );
    // console.log('srsly why what am i trying to set state to', [
    //   newURL,
    //   ...this.state.blockedURLs
    // ]);

    this.setState(function(state) {
      return {
        blockedURLs: [newURL, ...state.blockedURLs]
      };
    });

    // need to wait for state to be set before running code below
    setTimeout(() => {
      console.log(
        '---blockedURLs after setting state---',
        this.state.blockedURLs
      );
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

      chrome.storage.sync.get(['blockedURLs'], data => {
        console.log('fetching dataaaaa ⏱', data.blockedURLs);
      });
    }, 200);
  };

  handleChange = e => {
    const url = e.target.value;
    this.setState({
      urlString: url
    });
  };

  editURL = url => {
    // this will only work with full URLs, copy pasted from browser
    // temporary solution for now, see background.js.someUrls for correct URL format
    let frontTrim = url.substring(url.indexOf(':'));
    const index = frontTrim.indexOf('/', 3) + 1;
    return '*' + frontTrim.substring(0, index) + '*';
  };

  render() {
    const { blockedURLs } = this.state;

    return (
      <div className="url-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.urlString}
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
