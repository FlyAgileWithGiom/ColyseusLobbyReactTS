import React, {useEffect} from 'react';
import {Client, Room} from 'colyseus.js';

interface GameExampleProps {
    colyseus: Client;
    room: Room;
}

export const GameExample: React.FC<GameExampleProps> = ({room}) => {
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
