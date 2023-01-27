import React from 'react';
import Player from './Player';

interface Props {
    players: string[];
    currentPlayer: string;
}

const Players: React.FC<Props> = ({ players, currentPlayer }) => {
    return (
        <div className="players-container">
            {players && players.map((player) => (
                <Player key={player} name={player} isCurrent={currentPlayer == player}/>
            ))}
        </div>
    );
};

export default Players;
