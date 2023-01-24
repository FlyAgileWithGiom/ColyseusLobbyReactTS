import React, { useState, useEffect } from 'react';
import { Client, RoomAvailable, Room } from 'colyseus.js';

interface RoomsListProps {
  client: Client;
}

const RoomsList: React.FC<RoomsListProps> = ({ client }) => {
  const [availableRooms, setAvailableRooms] = useState<RoomAvailable[] | undefined>(undefined);
  const [joinedRoom, setJoinedRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    // join the lobby
    const joinLobby = async () => {
      const lobbyRoom = await client.join("lobby");
      
      // subscribe to updates of the rooms list
      lobbyRoom.onMessage("rooms", (rooms) => {
        setAvailableRooms(rooms);
      });
      return () => {
         lobbyRoom.removeAllListeners();
      }
    }
    joinLobby();
  }, [client]);

  const handleJoinRoom = async (roomId: string) => {
    const room = await client.joinById(roomId);
    setJoinedRoom(room);
  }

  const handleLeaveRoom = async () => {
    if(joinedRoom) {
      await joinedRoom.leave();
      setJoinedRoom(undefined);
    }
  }

  return (
    <div>
      <h2>Rooms</h2>
      {availableRooms && (
        <ul>
          {availableRooms.map((room: RoomAvailable) => (
            <li key={room.roomId}>
              {room.roomId} - {room.clients} clients
              {joinedRoom && joinedRoom.id === room.roomId ? (
                <button onClick={handleLeaveRoom}>Leave</button>
              ) : (
                <button onClick={() => handleJoinRoom(room.roomId)}>Join</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomsList