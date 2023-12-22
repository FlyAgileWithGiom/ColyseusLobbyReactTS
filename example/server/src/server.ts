import {LobbyRoom, Server} from "colyseus"
import {TeamRoom, TeamState} from "colyseus-teams-lobby";


const port = parseInt(process.env.PORT, 10) || 3000

const gameServer = new Server()
gameServer.listen(port)
console.log(`[GameServer] Listening on Port: ${port}`)

// Expose the "lobby" room.
gameServer
    .define("lobby", LobbyRoom);

export class ExampleRoom<T extends TeamState> extends TeamRoom<TeamState> {

}

// Expose your game room with realtime listing enabled.
gameServer
    .define("rabbit_game", ExampleRoom, {maxClients: 4})
    .enableRealtimeListing();
