/*global chrome*/
import React, { Component } from 'react';
import BlockList from './BlockList';

class BlockForm extends Component {
  state = {
    urlString: '',
    // I have to pass blocked URLs to the background page and send requests from there
    // state does not persist each time I close the popup (it's destroyed and re-initiated as an empty array)
    // what if I set it to a call to the local storage each time? that should work without having to use the background page as store, right?
    // okay, I've determined that the 'storage window' ?? of the popup doesn't persist. we neeed to send the data to the background page and save it from there.
    // wait.. it shouldn't matter?! syncing directly to browser.storage from the popup (non-persistent) should still work, as browser.storage is persistent. On component startup, the state should be reinitialied with a call to the browser.storage
    // ummm it seems browser.storage methods are async, so I need to write code to handle that
    blockedURLs: chrome.storage.local.get(['blockedURLs'], async data => {
      const stuff = await data.blockedURLs;
      console.log('🎉 stuff!!! 🎉', stuff);
      return stuff;
    }) || ['BANANA']
  };

  handleSubmit = e => {
    e.preventDefault();
    const newURL = this.editURL(this.state.urlString);

    console.log('🚀 ---TCL--- 🚀 BlockForm -> newURL', newURL);

    console.log(
      '---blockedURLs in state before setting---',
      this.state.blockedURLs
    );
    console.log('srsly why what am i trying to set state to', [
      newURL,
      ...this.state.blockedURLs
    ]);

    this.setState({
      blockedURLs: [newURL, ...this.state.blockedURLs]
    });

    // I think I have to put the above to trigger earlier somehow?
    // you have to submit again to get the previous URL (saved to state) to send to chrome storage

    console.log(
      '---blockedURLs after setting state---',
      this.state.blockedURLs
    );

    const blockedURLs = this.state.blockedURLs.slice();

    try {
      chrome.storage.local.set({ blockedURLs }, () => {
        console.log(`⬇️ Saved urls ${blockedURLs} to local storage`);
      });
    } catch (e) {
      console.log('🚫 Something went wrong while saving URLs!', e);
    }
    this.setState({
      urlString: ''
    });

    // check storage after setting
    // this logs correctly, but closing and opening the popup window does not return the correct blockedURL list from storage (returns 'BANANA' instead)
    chrome.storage.local.get(['blockedURLs'], async data => {
      const cool = await data;
      console.log('fetching dataaaaa ⏱', cool.blockedURLs);
    });
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
