/*global chrome*/
import React, { Component } from 'react';
import BlockList from './BlockList';
import { Button, Form, Grid, Container, Divider } from 'semantic-ui-react';
import './BlockForm.css';

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
      <React.Fragment>
        <Grid container centered columns={1}>
          <Grid.Row>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                type="text"
                onChange={this.handleChange}
                name="title"
                value={title}
                placeholder="What's the site called?"
              />
              <Form.Input
                type="text"
                onChange={this.handleChange}
                name="urlString"
                value={urlString}
                placeholder="URL goes here!"
              />
              <Button
                basic
                color="red"
                type="submit"
                disabled={!urlString || !title}
              >
                Block it!
              </Button>
            </Form>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Container className="block-list">
          <BlockList
            blockedURLs={blockedURLs}
            handleRemove={this.handleRemove}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default BlockForm;
