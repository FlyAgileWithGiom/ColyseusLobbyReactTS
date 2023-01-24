import {LobbyRoom, Server} from "colyseus"
import {RabbitGame} from "./rabbit_room";

const port = parseInt(process.env.PORT, 10) || 3000

const gameServer = new Server()
gameServer.listen(port)
console.log(`[GameServer] Listening on Port: ${port}`)

// Expose the "lobby" room.
gameServer
    .define("lobby", LobbyRoom);

// Expose your game room with realtime listing enabled.
gameServer
    .define("rabbit_game", RabbitGame)
    .enableRealtimeListing();
