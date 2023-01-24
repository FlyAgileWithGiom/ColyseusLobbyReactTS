import React, { useEffect, useState } from 'react';
import { Client, Room } from "colyseus.js";
import { PasswordForm } from './PasswordForm';
import AddRoom from './AddRoom';
import RoomsList from './RoomsList';

const Lobby: React.FC<{}> = () => {
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [lobby, setLobby] = useState<Room | undefined>(undefined);

  useEffect(() => {
    if (client && !lobby) {
      console.log("joining lobby");
      
      client
        .joinOrCreate("lobby")
        .then((lobby: Room) => {
          console.log("lobby joined");
          
          setLobby(lobby);
        });
    }
  }, [client, lobby]);

  function connectClient() {
    setClient(new Client(`ws://localhost:3000/colyseus`));
  }
  
  const onAuthentOk = () => {
    connectClient();
    console.log("client created");

    
  };

  if (!client) {
    return <PasswordForm onAuthentOk={onAuthentOk} />;
  }

  return client ? (lobby ? <RoomsList client={client} /> : <div>Awaiting Lobby connection...</div>):<div>Connecting...</div>;
};

const LobbyPage: React.FC = () => {
  return (
    <div>
      <Lobby />
    </div>
  );
};

export default LobbyPage;
