import {Client, Room, updateLobby} from "colyseus";

export class RabbitGame extends Room {

    onCreate(options: any) {

        console.log(`RabbitGame ${options.nick_name} room created!`);
        this.clock.setTimeout(() => {

            this.setMetadata({
                customData: "Hello world!",
                nick_name: options.nick_name
            }).then(() => updateLobby(this));

        }, 5000);

    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log(`${this.roomId}: ${client.sessionId} left!`);
    }

    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        console.log(`${this.roomId}: ${client.sessionId} joined!`);
    }

}
