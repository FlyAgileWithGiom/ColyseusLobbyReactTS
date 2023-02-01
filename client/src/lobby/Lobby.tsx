import React, {useEffect, useState} from 'react';
import {Client, Room, RoomAvailable} from 'colyseus.js';
import RoomsList from './RoomsList';
import AddRoom from './AddRoom';
import styled from 'styled-components';

interface Props {
    colyseusClient: Client;
    onStartGame: (room: Room) => void;
}

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

function DefinePlayer(props: { onDefinePlayer: any }) {
    const [playerName, setPlayerName] = useState<string>("");

    const definePlayerName = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onDefinePlayer(playerName);
    };

    return (
        <div>
            <h2>Current PLayer</h2>
            <form onSubmit={definePlayerName}>
                <input
                    type="text"
                    value={playerName}
                    placeholder="player name"
                    onChange={event => setPlayerName(event.target.value)}
                />
                <button type="submit">Define</button>
            </form>
        </div>
    );
}

const Lobby: React.FC<Props> = ({colyseusClient, onStartGame}) => {
    const [lobby, setLobby] = useState<Room | null>(null);
    const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>([]);
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);
    const [playerName, setPlayerName] = useState<string>("");

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
        handleLeaveRoom();

        colyseusClient?.joinById(roomId, {playerName: playerName})
            .then(joinedRoom => {
                joinRoomImpl(joinedRoom);
            });

    };

    const handleLeaveRoom = () => {
        joinedRoom?.leave()
            .then(() => {
                setJoinedRoom(null);
            });
    };

    function joinRoomImpl(joinedRoom: Room<unknown>) {
        setJoinedRoom(joinedRoom);
        console.log(`registering to start signal from room ${joinedRoom.id}`);
        joinedRoom.onMessage("start", () => {
            onStartGame(joinedRoom);
        });
    }

    const handleAddRoom = (title: string) => {

        handleLeaveRoom();

        colyseusClient?.create('rabbit_game', {
            title: title, playerName: playerName
        }).then(joinedRoom => {
            joinRoomImpl(joinedRoom);
        });

    };

    let handleDefinePlayer = (playerName: string) => {
        setPlayerName(playerName);
        console.log("Define player: " + playerName);
    };
    let handleStartGame = () => {
        console.log(`Start game in room ${joinedRoom}`);
        joinedRoom?.send("startCmd");
    };
    return (
        <LobbyFrame>
            <DefinePlayer onDefinePlayer={handleDefinePlayer}/>
            <LobbyWrapper>
                <RoomsList
                    availableRooms={availableRooms}
                    joinedRoom={joinedRoom}
                    onJoin={handleJoinRoom}
                    onLeave={handleLeaveRoom}
                    onStart={handleStartGame}
                />
            </LobbyWrapper>
            <LobbyWrapper>
                <AddRoom onAddRoom={handleAddRoom}/>
            </LobbyWrapper>
        </LobbyFrame>
    );
};

export default Lobby;
