import React from 'react';
import { Image } from 'semantic-ui-react';
import './TimerImage.css';

const TimerImage = props => {
  const tomatoSrc = 'https://image.flaticon.com/icons/svg/877/877712.svg';
  const workSrc =
    'https://media1.tenor.com/images/4a950a1e221d93e654047ecee711af5a/tenor.gif';
  const breakSrc = 'https://media.giphy.com/media/3tMAH63E0i0UX6oEuz/giphy.gif';

  return (
    <React.Fragment>
      <Image
        className={props.timerStatus === 'TIMER_RUNNING' ? 'logo' : ''}
        src={tomatoSrc}
        size="small"
        centered
      />
    </React.Fragment>
  );
};

export default TimerImage;
