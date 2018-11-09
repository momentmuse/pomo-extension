import React, { Component } from 'react';

class BlockForm extends Component {
  state = {
    urlString: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit triggered!!', this.state.urlString);
    this.editBlockUrl(this.state.urlString);
    // send domain url to chrome storage
    this.setState({
      urlString: ''
    });
  };

  handleChange = e => {
    const url = e.target.value;
    this.setState({
      urlString: url
    });
  };

  editBlockUrl = url => {
    // this will only work with full URLs, copy pasted from browser
    let frontTrim = url.substring(url.indexOf(':'));
    const index = frontTrim.indexOf('/', 3) + 1;
    const domainURL = '*' + frontTrim.substring(0, index) + '*';
    // return domain url to handleSubmit
    console.log('🚀 ---TCL--- 🚀 BlockForm -> domainURL', domainURL);
  };

  render() {
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
      </div>
    );
  }
}

export default BlockForm;
