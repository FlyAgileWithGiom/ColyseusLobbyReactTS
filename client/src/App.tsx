import React, {useState} from "react";
import Lobby from "./lobby/Lobby";
import {Client, Room} from "colyseus.js";
import GameComponent from "./game/GameComponent";

const hostname = window.location.hostname;

const App: React.FC = () => {
    const [colyseusClient] = useState<Client>(new Client(`ws://${hostname}:3000`));
    const [game, setGame] = useState<Room | null>(null);

    const handleStartGame = (room: Room) => {
        console.log('starting game ${room.id}');
        setGame(room);
    }

    return game == null
        ? <Lobby colyseusClient={colyseusClient} onStartGame={handleStartGame}/>
        : <GameComponent client={colyseusClient} room={game!}></GameComponent>;
};

export default App;
