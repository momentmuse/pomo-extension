import React from 'react';
import { Image } from 'semantic-ui-react';
import './TimerImage.css';

const TimerImage = props => {
  const { timerStatus, pomoCount } = props;

  const renderImage = () => {
    if (timerStatus === 'POMO_COMPLETE') {
      return 'https://image.flaticon.com/icons/svg/1141/1141821.svg';
    } else if (pomoCount % 2 !== 0) {
      return 'https://media.giphy.com/media/3tMAH63E0i0UX6oEuz/giphy.gif';
    } else {
      return 'https://image.flaticon.com/icons/svg/877/877712.svg';
      // flat: 'https://image.flaticon.com/icons/svg/877/877814.svg';
    }
  };

  return (
    <React.Fragment>
      <Image
        src={renderImage()}
        size="small"
        centered
        className={
          timerStatus === 'TIMER_RUNNING' && pomoCount % 2 === 0
            ? 'logo'
            : 'img'
        }
      />
    </React.Fragment>
  );
};

export default TimerImage;
