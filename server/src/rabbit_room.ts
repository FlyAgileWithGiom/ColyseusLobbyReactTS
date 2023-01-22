import { Room, updateLobby } from "colyseus";

export class RabbitGameRoom extends Room {

    onCreate() {

        //
        // This is just a demonstration
        // on how to call `updateLobby` from your Room
        //
        this.clock.setTimeout(() => {

            this.setMetadata({
                customData: "Hello world!"
            }).then(() => updateLobby(this));

        }, 5000);

    }

}