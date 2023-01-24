import React, {useEffect, useState} from 'react';
import {Client, Room, RoomAvailable} from 'colyseus.js';
import AddRoom from "./AddRoom";

interface RoomsListProps {
    client: Client;
}

const RoomsList: React.FC<RoomsListProps> = ({client}) => {
    const [lobby, setLobby] = useState<Room | undefined>(undefined);

    const [availableRooms, setAvailableRooms] = useState<RoomAvailable[] | undefined>(undefined);
    const [joinedRoom, setJoinedRoom] = useState<Room | undefined>(undefined);

    useEffect(() => {
        // join the lobby
        const joinLobby = async () => {
            const lobbyRoom = await client.joinOrCreate("lobby");
            console.log("lobby joined");
            setLobby(lobby);

            // subscribe to updates of the rooms list
            lobbyRoom.onMessage("rooms", (rooms) => {
                setAvailableRooms(rooms);
            });

            lobbyRoom.onMessage("+", ([roomId, room]) => {
                console.log(`Room ${room.roomId} has been created`);
                if (availableRooms) {
                    let roomIndex = availableRooms.findIndex(r => r.roomId === room.roomId);
                    if(roomIndex !== -1) {
                        availableRooms[roomIndex] = room;
                    } else {
                        availableRooms.push(room);
                    }
                    setAvailableRooms([...availableRooms]);
                }
            });

            lobbyRoom.onMessage("-", (roomId) => {
                console.log(`Room ${roomId} has been deleted`);
                // update the availableRooms here
                if (availableRooms) {
                    setAvailableRooms(availableRooms.filter(r => r.roomId !== roomId))
                }
            });

            // return () => {
            //     lobbyRoom.removeAllListeners();
            // }
        }
        joinLobby();
    }, [client, lobby]);

    const handleJoinRoom = async (roomId: string) => {
        const room = await client.joinById(roomId);
        setJoinedRoom(room);
    }

    const handleLeaveRoom = async () => {
        if (joinedRoom) {
            await joinedRoom.leave();
            setJoinedRoom(undefined);
        }
    }

    function handleCreateRoom(roomName: string) {
        client.create('rabbit_game', {nick_name: roomName})
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
            <AddRoom onCreateRoom={handleCreateRoom}/>
        </div>
    );
};

export default RoomsList
