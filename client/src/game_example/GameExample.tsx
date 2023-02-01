import React from 'react';
import {Client, Room} from 'colyseus.js';

interface GameExampleProps {
    client: Client;
    room: Room;
}

const GameExample: React.FC<GameExampleProps> = ({client, room}) => {
    return (
        <div>
            <h3>Room ID: {room.id}</h3>
            <h3>Title: {room.state.title}</h3>
            <h3>Current Player: {room.sessionId}</h3>
            <h3>Players: {room.state.players}</h3>
        </div>
    );
};

export default GameExample;
