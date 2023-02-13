import React, {useEffect, useState} from "react";
import Playground from "./Playground";
import PlayersList from "./PlayersList";
import Timer from "./Timer";
import Controls from "./Controls";
import './Game.css'
import {Client, Room} from 'colyseus.js';

interface GameProps {
    colyseus: Client;
    room: Room;
}


interface GameStateItf {
    players: string[],
    hats: number[],
    rabbits: number[],
    currentPlayer: string | null,
    timeLeft: number,
    announcement: string
}

const GameComponent: React.FC<GameProps> = (props) => {
    const [gameState, setGameState] = useState<GameStateItf>(copyColyseusState());

    function copyColyseusState() {
        return {
            players: [...props.room.state.players.values()],
            hats: [...props.room.state.hats],
            rabbits: [...props.room.state.rabbits],
            currentPlayer: props.room.state.currentPlayer,
            timeLeft: props.room.state.timeLeft,
            announcement: props.room.state.announcement
        }
    }

    useEffect(() => {
        props.room.onStateChange((state) => {
            console.log('state changed', state);
            setGameState(copyColyseusState());
        });

    }, []);

    const handleNextTurn = () => {
        console.log('next turn');
        props.room.send('nextTurn');
    };

    const handleSwapStacks = (i: number, j: number) => {
        console.log(`swap stacks ${i} and ${j}`)
        props.room.send('swapStacks', {i, j});
    };
    const handleSwapHats = (i: number, j: number) => {
        console.log(`swap hats ${i} and ${j}`)
        props.room.send('swapHats', {i, j});
    };
    const handleFlipStack = (i: number) => {
        console.log(`flip stack ${i}`)
        props.room.send('flipStack', {i});
    };

    return (
        <div className="flex flex-col items-center">
            <PlayersList players={gameState.players} currentPlayer={props.room.state.currentPlayer}/>
            <Timer time={gameState.timeLeft}/>
            <Playground
                hats={gameState.hats}
                rabbits={gameState.rabbits}
                onSwapStacks={handleSwapStacks}
                onSwapHats={handleSwapHats}
                onFlipStack={handleFlipStack}
            />
            <Controls
                onEndTurn={handleNextTurn}
                nextDisabled={!gameState.currentPlayer}
            />
            {
                gameState.announcement ?
                    <div className="announcement">{gameState.announcement}</div>
                    : null
            }
        </div>
    );
};

export default GameComponent;
