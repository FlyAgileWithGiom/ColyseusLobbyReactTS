import React, { useState } from 'react';
import AddRoom from './AddRoom';

interface Room {
  name: string;
  players: string[];
}

interface Props {
  rooms: Room[];
  onJoin: (room: Room) => void;
  onDelete: (room: Room) => void;
  onAdd: (name: string) => void;
}

const RoomsList: React.FC<Props> = ({ rooms, onJoin, onDelete, onAdd }) => {

  const joinRoom = (room: Room) => {
    onJoin(room);
  };

  const deleteRoom = (room: Room) => {
    onDelete(room);
  };

  return (
    <div>
          <h2>Rooms</h2>
          {rooms.map((room) => (
            <div key={room.name}>
              <h3>{room.name}</h3>
              <p>Players: {room.players.join(', ')}</p>
              <button type="button" onClick={() => joinRoom(room)}>
                Join room
              </button>
              <button type="button" onClick={() => deleteRoom(room)}>
                Delete room
              </button>
            </div>
          ))}
          <AddRoom onAdd={onAdd} />
    </div>
  );
};

export default RoomsList;
