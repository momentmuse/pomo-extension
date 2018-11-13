/*global chrome*/

import React, { Component } from 'react';
import './App.css';
import TimerDisplay from './components/Timer/TimerDisplay';
import TimerButton from './components/Timer/TimerButton';
import TimerConfig from './components/Timer/TimerConfig';
import BlockForm from './components/Options/BlockForm';
import TimerImage from './components/Timer/TimerImage';
import { Grid, Divider } from 'semantic-ui-react';

class App extends Component {
  state = {
    display: 'timer',
    // if I had more time, I would set up an event listener and handler to track changes in background.js
    background: chrome.extension.getBackgroundPage()
  };

  // current mode of communication between App and background relies on reference to mutating the same object in memory--which undermines the design principles of React!
  // App.state is not set up to handle and reset state upon background mutation
  // thus, I need to repeatedly reset the state to force re-render
  componentDidMount() {
    setInterval(() => {
      this.setState(this.state);
    }, 300);
  }

  toggleTimer = () => {
    this.state.background.toggleTimer();
  };

  resetTimer = () => {
    this.state.background.resetTimer('NOT_SET');
  };

  openOptions = () => {
    this.setState({
      display: 'options'
    });
  };

  openTimer = () => {
    this.setState({
      display: 'timer'
    });
  };

  // TODO: Integrate Block Current tab
  // blockCurrentTab = () => {
  // console.log('👾 Blocking the current tab! Wooo!');
  // this.state.background.blockCurrentTab();
  // };

  // TODO: change menu to tabular
  // state = { activeItem: 'bio' }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  // render() {
  //   const { activeItem } = this.state

  //   return (
  //     <Menu  tabular>
  //       <Menu.Item position="right" name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
  //       <Menu.Item name='photos' active={activeItem === 'photos'} onClick={this.handleItemClick} />
  //     </Menu>
  //   )
  // }

  render() {
    const { timer } = this.state.background;
    return (
      <div className="App">
        <Grid centered columns={1}>
          <Grid.Row verticalAlign="top">
            <React.Fragment>
              <TimerConfig
                openOptions={this.openOptions}
                openTimer={this.openTimer}
                blockCurrentTab={this.blockCurrentTab}
                display={this.state.display}
                timerStatus={timer.timerStatus}
                pomoCount={timer.pomoCount}
              />
            </React.Fragment>
          </Grid.Row>

          {this.state.display === 'timer' ? (
            <React.Fragment>
              <Grid.Row>
                <TimerImage
                  timerStatus={timer.timerStatus}
                  pomoCount={timer.pomoCount}
                />
              </Grid.Row>

              <Divider hidden clearing />

              <Grid.Row>
                <TimerDisplay
                  timerDisplay={timer.remaining}
                  timerStatus={timer.timerStatus}
                  pomoCount={timer.pomoCount}
                />
              </Grid.Row>

              <Grid.Row verticalAlign="bottom">
                <TimerButton
                  toggleTimer={this.toggleTimer}
                  resetTimer={this.resetTimer}
                  timerStatus={timer.timerStatus}
                />
              </Grid.Row>
            </React.Fragment>
          ) : (
            <BlockForm background={this.state.background} />
          )}
        </Grid>
      </div>
    );
  }
}

export default App;
