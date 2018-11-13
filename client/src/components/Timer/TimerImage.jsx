import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import './TimerImage.css';

class TimerImage extends Component {
  renderImage = () => {
    if (this.props.timerStatus === 'POMO_COMPLETE') {
      return 'https://image.flaticon.com/icons/svg/1141/1141821.svg';
    } else if (this.props.pomoCount % 2 !== 0) {
      return 'https://media.giphy.com/media/3tMAH63E0i0UX6oEuz/giphy.gif';
    } else {
      return 'https://image.flaticon.com/icons/svg/877/877712.svg';
    }
  };

  render() {
    const { timerStatus, pomoCount } = this.props;
    return (
      <React.Fragment>
        <Image
          className={
            timerStatus === 'TIMER_RUNNING' && pomoCount % 2 === 0 ? 'logo' : ''
          }
          src={this.renderImage()}
          size="small"
          centered
        />
      </React.Fragment>
    );
  }
}

export default TimerImage;
