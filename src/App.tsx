import React, {useState} from 'react';

interface Game {
    name: string;
    players: string[];
}

const GamesList: React.FC<{ games: Game[] }> = () => {
    const [games, setGames] = useState<Game[]>(initialGames);

    const [password, setPassword] = useState('titi');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const [newGameName, setNewGameName] = useState('');

    const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === 'titi') {
            setIsPasswordCorrect(true);
            console.log('Correct password submitted!');
        } else {
            console.log('Incorrect password submitted.');
        }
    };

    const joinGame = (game: Game) => {
        const updatedGame = {...game, players: [...game.players, 'current user']};
        setGames(games.map((g) => (g.name === game.name ? updatedGame : g)));
    };

    const deleteGame = (game: Game) => {
        setGames(games.filter((g) => g.name !== game.name));
    };

    const addGame = () => {
        const newGame: Game = { name: newGameName, players: [] };
        setGames([...games, newGame]);
        setNewGameName('');
    };

    return (
        <div>
            {!isPasswordCorrect ? (
                <form onSubmit={handlePasswordSubmit}>
                    <label htmlFor="password">Please enter the password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
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
                     <h2>Add new game</h2>
                     <label htmlFor="newGameName">Name:</label>
                     <input
                         type="text"
                         id="newGameName"
                         defaultValue=""
                         onChange={(event) => setNewGameName(event.target.value)}
                     />
                     <button type="button" onClick={addGame}>
                         Create game
                     </button>
                 </div>


                )}
        </div>
    );
};

const initialGames: Game[] = [
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
            <GamesList games={initialGames}/>
        </div>
    );
};

export default App;
