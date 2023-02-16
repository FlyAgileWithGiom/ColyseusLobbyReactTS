import React, {useEffect, useState} from 'react';
import {Client, Room, RoomAvailable} from 'colyseus.js';
import RoomsList from './RoomsList';
import AddRoom from './AddRoom';
import NameDisplay from "./NameDisplay";
import {animals, colors, starWars, uniqueNamesGenerator} from 'unique-names-generator';

export function generateRoomName() {
    //make the generated room name title case

    return uniqueNamesGenerator({
        dictionaries: [colors, animals]
    }).replace('_', ' ').replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function generatePlayerName() {
    return uniqueNamesGenerator({
        dictionaries: [starWars]
    });
}


// Han Solo
interface Props {
    colyseusClient: Client;
    onStartGame: (room: Room) => void;
}


const Lobby: React.FC<Props> = ({colyseusClient, onStartGame}) => {
    const [lobby, setLobby] = useState<Room | null>(null);
    const [availableRooms, setAvailableRooms] = useState<RoomAvailable[]>([]);
    const [joinedRoom, setJoinedRoom] = useState<Room | null>(null);
    const [playerName, setPlayerName] = useState<string>(generatePlayerName());

    useEffect(() => {
        colyseusClient
            .joinOrCreate("lobby")
            .then((lobby: Room) => {
                setLobby(lobby);
                lobby.onMessage("rooms", (rooms: RoomAvailable[]) => {
                    if (rooms.length == 0) {
                        createAndJoinRoom(generateRoomName())
                    }
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

    function createAndJoinRoom(title: string) {
        colyseusClient?.create('rabbit_game', {
            title: title, playerName: playerName
        }).then(joinedRoom => {
            joinRoomImpl(joinedRoom);
        });
    }

    const handleAddRoom = (title: string) => {

        handleLeaveRoom();

        createAndJoinRoom(title);

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
        <div className="flex flex-col items-center justify-center m-20">
            <NameDisplay initialName={playerName} onConfirmNameChange={handleDefinePlayer}/>
            <div className="flex flex-col items-center justify-around m-20">
                <RoomsList
                    availableRooms={availableRooms}
                    joinedRoom={joinedRoom}
                    onJoin={handleJoinRoom}
                    onLeave={handleLeaveRoom}
                    onStart={handleStartGame}
                />
            </div>
            <div className="flex flex-col items-center justify-around m-20">
                <AddRoom onAddRoom={handleAddRoom}/>
            </div>
        </div>
    );

};

export default Lobby;
