import React from 'react';

export interface PlayerProps {
    name: string;
    isCurrent: boolean;
}

const Player: React.FC<PlayerProps> = ({name, isCurrent}) => (
    <div className={`player${isCurrent ? ' current' : ''}`}>
        <p>{name}</p>
    </div>
);

export default Player;
