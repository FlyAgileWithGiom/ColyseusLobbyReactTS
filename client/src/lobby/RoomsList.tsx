import React from 'react';
import {Room, RoomAvailable} from 'colyseus.js';

interface RoomsListProps {
    availableRooms: RoomAvailable[],
    joinedRoom: Room | null,
    onJoin: (roomId: string) => void,
    onLeave: () => void
}

const RoomsList: React.FC<RoomsListProps> = ({availableRooms, joinedRoom, onJoin, onLeave}) => {

    const handleJoin = (roomId: string) => {
        onJoin(roomId);
    }

    const handleLeave = () => {
        onLeave();
    }

    return (
        <div>
            <h2>Available Rooms:</h2>
            <table>
                <thead>
                <tr>
                    <th>Room</th>
                    <th>Number of Players</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {availableRooms.map((room) => (
                    <tr key={room.roomId}>
                        <td>{room.metadata?.title || room.roomId}</td>
                        <td>{room.clients}</td>
                        {room.metadata?.players && room.metadata.players.map((player: string) => (
                            <td>{player}</td>
                        ))}

                        <td>
                            {joinedRoom && joinedRoom.id === room.roomId ? (
                                <button onClick={handleLeave}>Leave</button>
                            ) : (
                                 <button onClick={() => handleJoin(room.roomId)}>Join</button>
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
