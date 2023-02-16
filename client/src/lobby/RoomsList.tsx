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
                <tr className="text-left">
                    <th>Room</th>
                    <th>Players</th>
                </tr>
                </thead>
                <tbody>
                {availableRooms.map((room) => (
                    <tr key={room.roomId}>
                        <td>{room.metadata?.title || room.roomId}</td>
                        <td>{room.metadata?.players?.join(', ')}</td>

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
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomsList;
