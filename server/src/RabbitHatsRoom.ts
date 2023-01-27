import {Client, Room, updateLobby} from "colyseus";
import {ArraySchema, MapSchema, Schema, type} from "@colyseus/schema";

export class GameState extends Schema {
    @type("string") title: string;
    @type({map: "string"}) players = new MapSchema<string>();
    @type(["number"]) hats = new ArraySchema<number>(1, 2, 3, 4, 5, 6, 7, 8, 9);
    @type(["number"]) rabbits = new ArraySchema<number>(1, 2, 3, 4, 5, 6, 7, 8, 9);
    @type("string") currentPlayer = "";
    @type("string") lastMove = "";
    @type("number") timeLeft = 0;
}

function swap(a: number[], i, j) {
    // swao elements i and j in array a
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

class RabbitHatsGameRoom extends Room<GameState> {
    onCreate({title}: any) {
        this.setState(new GameState())

        console.log(`RabbitHats game ${title} room created!`);
        this.state.title = title;
        this.setMetadata({
            title: title,
            players: []
        }).then(() => {
                updateLobby(this);
            }
        )
        this.onMessage('startCmd', () => {
            console.log(`starting room ${this.roomId}`);
            this.broadcast('start', `we're starting the game with ${[...this.state.players.values()].join(', ')}`);
        })

        this.onMessage('swapHats', (client, {i, j}) => {
            this.swapHats(i, j);
        })
    }

    onJoin(client: Client, options?: { playerName: string }, auth?: any): void | Promise<any> {
        console.log(`options: ${JSON.stringify(options)}`)
        let playerName = options?.playerName;
        this.state.players[client.sessionId] = playerName;
        this.metadata.players.push(`${playerName}`);
        updateLobby(this);
        console.log(`${this.roomId}: ${playerName} joined!`);
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        // pop the current player from the state.
        let playerName = this.state.players[client.sessionId];
        this.state.players.delete(client.sessionId);
        this.metadata.players = this.metadata.players.filter(
            (player) => player !== `${playerName}`
        )

        updateLobby(this);

        console.log(`${this.roomId}: ${playerName} left!`);
    }

    private swapHats(i, j) {
        console.log(`swapping hats ${i},${j} in ${[...this.state.hats.values()]}`);
        swap(this.state.hats, i, j)
        console.log(`hats are now ${[...this.state.hats.values()]}`);
    }
}

export {RabbitHatsGameRoom};
