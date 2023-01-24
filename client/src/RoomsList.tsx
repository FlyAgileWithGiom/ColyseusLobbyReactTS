import React from 'react';
import {Room, RoomAvailable} from "colyseus.js";

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
            <ul>
                {availableRooms.map((room) => (
                    <li key={room.roomId}>
                        {room.metadata?.title || room.roomId} - {room.clients} Clients
                        {joinedRoom && joinedRoom.id === room.roomId ? (
                            <button onClick={handleLeave}>Leave</button>
                        ) : (
                             <button onClick={() => handleJoin(room.roomId)}>Join</button>
                         )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomsList;
