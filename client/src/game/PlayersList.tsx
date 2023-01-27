import React from 'react';
import Player from './Player';

interface PlayersListProps {
    players: string[];
    currentPlayer: string | null;
}

const PlayersList: React.FC<PlayersListProps> = ({players, currentPlayer}) => (
    <div className="flex">
        {
            players.map((player) =>
                <Player key={player} name={player} isCurrent={currentPlayer === player}/>
            )
        }
    </div>
);

export default PlayersList;
