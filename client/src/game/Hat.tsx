import React from 'react';

interface HatProps {
    number: number;
    flipped: boolean
}

const Hat: React.FC<HatProps> = (props) => {
  return (
      <div className={props.flipped ? '' : 'grayscale-100'}>
          <img src={`/images/hat-${props.number}.png`} alt={`Hat ${props.number}`}/>
      </div>
  );
}

export default Hat;
