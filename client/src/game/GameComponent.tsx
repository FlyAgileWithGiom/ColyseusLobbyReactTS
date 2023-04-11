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
    currentPlayer: string | null,
    timeLeft: number,
    announcement: string
}

const GameComponent: React.FC<GameProps> = (props) => {
    const [gameState, setGameState] = useState<GameStateItf>(copyColyseusState());

    function copyColyseusState(): GameStateItf {
        return {
            players: [...props.room.state.players.values()],
            currentPlayer: props.room.state.currentPlayer,
            timeLeft: props.room.state.timeLeft,
            announcement: props.room.state.announcement
        }
    }

    useEffect(() => {
        props.room.onStateChange((state) => {
            console.log('game state changed', state);
            setGameState(copyColyseusState());
        });

    }, []);

    const handleNextTurn = () => {
        console.log('next turn');
        props.room.send('nextTurn');
    };

    const handleHatSelected = (i: number) => {
        console.log(`hat ${i} selected`);
        props.room.send('selectHat', {i});
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
                room={props.room}
                onSwapStacks={() => {
                }}
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