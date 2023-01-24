import React, { useEffect, useState } from 'react';
import { Client, Room } from "colyseus.js";
import { PasswordForm } from './PasswordForm';
import AddRoom from './AddRoom';
import RoomsList from './RoomsList';

const Lobby: React.FC<{}> = () => {
  const [client, setClient] = useState<Client | undefined>(undefined);

  function connectClient() {
    setClient(new Client(`ws://localhost:3000`));
  }

  const onAuthentOk = () => {
    connectClient();
    console.log("client created");


  };

  if (!client) {
    return <PasswordForm onAuthentOk={onAuthentOk} />;
  }

  return client ? <RoomsList client={client} /> : <div>Connecting...</div>;
};

const LobbyPage: React.FC = () => {
  return (
    <div>
      <Lobby />
    </div>
  );
};

export default LobbyPage;
