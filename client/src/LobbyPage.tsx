import React, {useEffect, useState} from 'react';
import {Client, Room, RoomAvailable} from 'colyseus.js';
import RoomsList from './RoomsList';
import AddRoom from './AddRoom';
import styled from 'styled-components';

interface Props {}

const LobbyFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  //height: 100vh;
  margin: 20px;
`;

const LobbyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  //height: 100vh;
  margin: 20px;
`;

const Lobby: React.FC<Props> = () => {
    const colyseusClient = new Client('ws://localhost:3000');
    const [lobby, setLobby] = useState<Room | null>(null);
    const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>([]);
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);

    useEffect(() => {
        colyseusClient
            .joinOrCreate("lobby")
            .then((lobby: Room) => {
                setLobby(lobby);
                lobby.onMessage("rooms", (rooms: RoomAvailable[]) => {
                    setAvailableRooms(rooms);
                });

                lobby.onMessage("+", ([roomId, room]) => {
                    setAvailableRooms(prevRooms => [...(prevRooms.filter(r => r.roomId !== roomId)), room]);
                });

                lobby.onMessage("-", (roomId: string) => {
                    setAvailableRooms(prevRooms => prevRooms.filter(r => r.roomId !== roomId));
                });
            });

        return () => {
            lobby?.leave();
        };

    }, []);

    const handleJoinRoom = (roomId: string) => {
        colyseusClient?.joinById(roomId, {title: "player1"})
            .then(joinedRoom => {
                setJoinedRoom(joinedRoom);
            });
    };

    const handleLeaveRoom = () => {
        joinedRoom?.leave()
            .then(() => {
                setJoinedRoom(null);
            });
    };

    const handleAddRoom = (title: string) => {
        colyseusClient?.create('rabbit_game', {title: title}).then(room => {
            setJoinedRoom(room);
        })
    };

    return (
        <LobbyFrame>
            <LobbyWrapper>
                <RoomsList
                    availableRooms={availableRooms}
                    joinedRoom={joinedRoom}
                    onJoin={handleJoinRoom}
                    onLeave={handleLeaveRoom}
                />
            </LobbyWrapper>
            <LobbyWrapper>
                <AddRoom onAddRoom={handleAddRoom}/>
            </LobbyWrapper>
        </LobbyFrame>
    )
        ;
};

export default Lobby;
