import {Client, Room, updateLobby} from "colyseus";
import {MapSchema, Schema, type} from "@colyseus/schema";

class State extends Schema {
    @type("string")
    title: string;
    @type({map: "string"})
    players: MapSchema<string> = new MapSchema<string>();
}

export class ExampleRoom extends Room<State> {

    onCreate({title}: any) {
        this.setState(new State())
        console.log(`RabbitGame ${title} room created!`);
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

    onJoin(client: Client, options?: { playerName: string }, auth?: any): void | Promise<any> {
        console.log(`options: ${JSON.stringify(options)}`)
        let playerName = options?.playerName;
        this.state.players[client.sessionId] = playerName;
        this.metadata.players.push(`${playerName}`);
        updateLobby(this);

        console.log(`${this.roomId}: ${playerName} joined!`);
    }

}
