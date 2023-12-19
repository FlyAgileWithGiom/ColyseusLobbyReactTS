import React, {useState} from "react";
import {Client, Room} from "colyseus.js";
import {Lobby} from "react-colyseus-lobby.js";
import {GameExample} from "./game_example/GameExample";



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
        : <GameExample colyseus={colyseusClient} room={game!}></GameExample>;
};

export default App;
