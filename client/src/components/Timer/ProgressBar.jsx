import React, { Component } from 'react';
import { Button, Progress } from 'semantic-ui-react';

export default class ProgressExampleIndicating extends Component {
  state = { percent: 33 };

  increment = () =>
    this.setState({
      percent: this.state.percent >= 100 ? 0 : this.state.percent + 20
    });

  render() {
    return (
      <div>
        <Progress percent={this.state.percent} size="tiny" indicating />
        <Button size="mini" onClick={this.increment}>
          Increment
        </Button>
      </div>
    );
  }
}
