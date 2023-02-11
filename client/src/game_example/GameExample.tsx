import React, {useEffect} from 'react';
import {Client, Room} from 'colyseus.js';

interface GameExampleProps {
    client: Client;
    room: Room;
}

const GameExample: React.FC<GameExampleProps> = ({client, room}) => {
    useEffect(() => {
        room.onStateChange((state) => {
            console.log('Room state changed!', state);
        });
        room.onMessage('message', (message) => {
            console.log('Message received!', message);
        });
    })

    return (
        <div>
            <h3>Room ID: {room.id}</h3>
            <h3>Title: {room.state.title}</h3>
            <h3>Current Player: {room.state.players[room.sessionId]}</h3>
            <h3>Players: {[...room.state.players.values()].join(', ')}</h3>
        </div>
    );
};

export default GameExample;
