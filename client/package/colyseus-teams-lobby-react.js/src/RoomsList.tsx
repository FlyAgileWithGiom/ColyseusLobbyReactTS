import React from 'react';
import {Room, RoomAvailable} from 'colyseus.js';

interface RoomsListProps {
    availableRooms: RoomAvailable[],
    joinedRoom: Room | null,
    onJoin: (roomId: string) => void,
    onLeave: () => void
    onStart: () => void
}

const RoomsList: React.FC<RoomsListProps> = ({availableRooms, joinedRoom, onJoin, onLeave, onStart}) => {

    return (
        <div>
            <h2>Available Rooms:</h2>
            <table>
                <thead>
                <tr>
                    <th>Room</th>
                    <th>Players</th>
                </tr>
                </thead>
                <tbody>
                {availableRooms.map((room) => (
                    <RoomRow
                        key={room.roomId}
                        room={room}
                        joinedRoom={joinedRoom}
                        onJoin={onJoin}
                        onLeave={onLeave}
                        onStart={onStart}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

interface RoomRowProps {
    room: RoomAvailable,
    joinedRoom: Room | null,
    onJoin: (roomId: string) => void,
    onLeave: () => void,
    onStart: () => void
}

const RoomRow: React.FC<RoomRowProps> = ({room, joinedRoom, onJoin, onLeave, onStart}) => {
    return (

        <tr key={room.roomId}>
            <td key={`${room.roomId}-id`}>{room.metadata?.title || room.roomId}</td>
            {room.metadata?.players && room.metadata.players.map((player: string) => (
                <td key={`${room.roomId}-${player}`}>{player}</td>
            ))}
            <td>
                {joinedRoom && joinedRoom.id === room.roomId ? (
                    <div>
                        <button onClick={() => {
                            onLeave();
                        }}>Leave
                        </button>
                        <button onClick={() => onStart()}>Start Game</button>
                    </div>
                ) : (
                    <button onClick={() => onJoin(room.roomId)}>Join</button>
                )}
            </td>
        </tr>

    );
};

export default RoomsList;
