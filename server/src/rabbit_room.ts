import {Client, Room} from "colyseus";

export class RabbitGame extends Room {

    onCreate({title}: any) {

        console.log(`RabbitGame ${title} room created!`);
        this.setMetadata({
            title: title
        });

    }

    onLeave(client: Client, consented?: boolean): void | Promise<any> {
        console.log(`${this.roomId}: ${client.sessionId} left!`);
    }

    onJoin(client: Client, options?: any, auth?: any): void | Promise<any> {
        console.log(`${this.roomId}: ${client.sessionId} joined!`);
    }

}
