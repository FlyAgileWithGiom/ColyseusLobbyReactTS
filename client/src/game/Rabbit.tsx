import React from 'react';

interface RabbitProps {
    number: number;
    flipped: boolean
}

const Rabbit: React.FC<RabbitProps> = (props) => {
  return (
      <div className={props.flipped ? '' : 'card-flipped'}>
          <img src={`/images/rabbit-${props.number}.png`} alt={`Rabbit ${props.number}`}/>
      </div>
  );
}

export default Rabbit;
