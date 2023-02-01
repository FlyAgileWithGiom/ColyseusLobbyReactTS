import {Client, Room} from "colyseus";
import {MapSchema, Schema, type} from "@colyseus/schema";

class State extends Schema {
    @type("string")
    title: string;
    @type({map: "string"})
    players: MapSchema<string> = new MapSchema<string>();
}

export class RabbitGame extends Room<State> {


    onCreate({title}: any) {
        this.setState(new State())
        console.log(`RabbitGame ${title} room created!`);
        this.state.title = title;
        this.setMetadata({
            title: title
        });
        this.setMetadata({
            players: []
        })
    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        // pop the current player from the state.
        let playerName = this.state.players[client.sessionId];
        this.state.players.delete(client.sessionId);
        this.metadata.players = this.metadata.players.filter((player) => player !== `${client.sessionId}-${playerName}`);
        console.log(`${this.roomId}: ${client.sessionId}-${playerName} left!`);
    }

    onJoin(client: Client, options?: { playerName: string }, auth?: any): void | Promise<any> {
        console.log(`options: ${JSON.stringify(options)}`)
        let playerName = options?.playerName;
        this.state.players[client.sessionId] = playerName;
        this.metadata.players.push(`${client.sessionId}-${playerName}`);
        console.log(`${this.roomId}: ${client.sessionId}-${playerName} joined!`);
    }

}
