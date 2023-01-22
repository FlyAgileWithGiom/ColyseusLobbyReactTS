import React, { useEffect, useState } from 'react';
import { Client } from "colyseus.js";
import { PasswordForm } from './PasswordForm';
import AddRoom from './AddRoom';
import RoomsList from './RoomsList';

interface Room {
  name: string;
  players: string[];
}

interface Props {
  initialGames: Room[]
}

const Lobby: React.FC<Props> = ({initialGames}) => {

  const [games, setGames] = useState<Room[]>(initialGames);

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const [newGameName, setNewGameName] = useState('');

  const [client, setClient] = useState<Client | undefined>(undefined);

  const handlePasswordSubmit = (isCorrect: boolean) => {
    setIsPasswordCorrect(isCorrect);
  };

  const joinRoom = (game: Room) => {
    const updatedGame = { ...game, players: [...game.players, 'current user'] };
    setGames(games.map((g) => (g.name === game.name ? updatedGame : g)));
  };

  const deleteRoom = (game: Room) => {
    setGames(games.filter((g) => g.name !== game.name));
  };
  
  const addRoom = (name: string) => {
    const newGame: Room = { name, players: [] };
    setGames([...games, newGame]);
  };

  return (
    <div>
      {!isPasswordCorrect ? (
        
          <PasswordForm onPasswordSubmit={setIsPasswordCorrect}/>
        
      ) : (
        <RoomsList 
        rooms={games} 
        onJoin={joinRoom} 
        onDelete={deleteRoom} 
        onAdd={addRoom} 
      />
      )

      }
    </div>
  );
};

const initialGames: Room[] = [
  {
    name: 'Game 1',
    players: ['Player 1', 'Player 2'],
  },
  {
    name: 'Game 2',
    players: ['Player 3', 'Player 4', 'Player 5'],
  },
];

const LobbyPage: React.FC = () => {
  // @ts-ignore
  return (
    <div>
      <Lobby initialGames={initialGames} />
    </div>
  );
};

export default LobbyPage;
