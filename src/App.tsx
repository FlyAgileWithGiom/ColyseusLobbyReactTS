import React, { useState } from 'react';
import { Client } from "colyseus.js";
import { PasswordForm } from './PasswordForm';
import AddGame from './GameCreateForm';

interface Room {
  name: string;
  players: string[];
}

interface Props {
  initialGames: Room[]
}

const GamesList: React.FC<Props> = ({initialGames}) => {

  const [games, setGames] = useState<Room[]>(initialGames);

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const [newGameName, setNewGameName] = useState('');


  const handlePasswordSubmit = (isCorrect: boolean) => {
    setIsPasswordCorrect(isCorrect);
  };

  const joinGame = (game: Room) => {
    const updatedGame = { ...game, players: [...game.players, 'current user'] };
    setGames(games.map((g) => (g.name === game.name ? updatedGame : g)));
  };

  const deleteGame = (game: Room) => {
    setGames(games.filter((g) => g.name !== game.name));
  };

  
  const handleAddGame = (name: string) => {
    const newGame: Room = { name, players: [] };
    setGames([...games, newGame]);
  };

  return (
    <div>
      {!isPasswordCorrect ? (
        
          <PasswordForm onPasswordSubmit={setIsPasswordCorrect}/>
        
      ) : (
        <div>
          <h2>Games</h2>
          {games.map((game) => (
            <div key={game.name}>
              <h3>{game.name}</h3>
              <p>Players: {game.players.join(', ')}</p>
              <button type="button" onClick={() => joinGame(game)}>
                Join game
              </button>
              <button type="button" onClick={() => deleteGame(game)}>
                Delete game
              </button>
            </div>
          ))}
          <AddGame onAdd={handleAddGame}/>
        </div>
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

const App: React.FC = () => {
  // @ts-ignore
  return (
    <div>
      <GamesList initialGames={initialGames} />
    </div>
  );
};

export default App;
