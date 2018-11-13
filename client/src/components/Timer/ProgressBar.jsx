import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';

class ProgressBar extends Component {
  state = { percent: 0 };

  // this isn't good practice, but I'm implementing the feature quickly
  componentDidMount() {
    setInterval(this.incrementProgress, 500);
  }

  assignPercentage = () => {
    const { pomoCount, timerStatus } = this.props;
    if (timerStatus === 'POMO_COMPLETE') return 100;

    if (pomoCount === 0) {
      return 0;
    } else if (pomoCount === 1) {
      return 12.5;
    } else if (pomoCount === 2) {
      return 25;
    } else if (pomoCount === 3) {
      return 37.5;
    } else if (pomoCount === 4) {
      return 50;
    } else if (pomoCount === 5) {
      return 62.5;
    } else if (pomoCount === 6) {
      return 75;
    } else if (pomoCount === 7) {
      return 87.5;
    } else {
      console.log('Handle this edge case! 😱');
    }
  };

  incrementProgress = () => {
    const newPercent = this.assignPercentage();
    this.setState({
      percent: newPercent
    });
  };

  render() {
    return (
      <div>
        <Progress percent={this.state.percent} size="tiny" indicating />
      </div>
    );
  }
}

export default ProgressBar;
