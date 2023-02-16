import React, {useEffect, useState} from 'react';
import Stack from './Stack';
import {Room} from "colyseus.js";

interface PlaygroundProps {
    room: Room
    onSwapStacks: (from: number, to: number) => void;
    onFlipStack: (stackNumber: number) => void;
}

interface BoardStateItf {
    action: string | null,
    hats: number[],
    rabbits: number[],
    selectedHats: [number],
    selectedStacks: [number],
    flippedStack: number
}

function cloneBoardState(state: BoardStateItf) {
    return {
        hats: [...state.hats],
        rabbits: [...state.rabbits],
        selectedHats: [...state.selectedHats],
        selectedStacks: [...state.selectedStacks],
        flippedStacks: state.flippedStack
    }
}

const Playground: React.FC<PlaygroundProps> = (props) => {
    const [boardState, setBoardState] = useState<any>(cloneBoardState(props.room.state));

    // synchronise the board state with the room state
    useEffect(() => {
        props.room.onStateChange((state) => {
            console.log('playground state changed', state);
            setBoardState(cloneBoardState(state));
        })
    }, [])

    const handleSelectHat = (number: number) => {
        props.room.send('selectHat', {i: number})
    }

    const handleSwapStack = (number: number) => {
        props.room.send('selectStack', {i: number})
    }

    const handleFlip = (number: number) => {
        props.room.send('flipStack', {i: number})
    }

    function isHatSelected(i: number) {
        return i !== null && boardState.selectedHats.includes(i);
    }

    function isStackSelected(i: number) {
        return i !== null && boardState.selectedStacks.includes(i);
    }

    function isStackFlipped(i: number) {
        return i !== null && boardState.flippedStacks !== i;
    }

    return (
        <div className="flex flex-row my-20 select-none">
            {
                Array.from({length: boardState.hats.length}, (_, i) => (
                    <div className="" key={i}>
                        <Stack
                            key={i}
                            hatNumber={boardState.hats[i]}
                            rabbitNumber={boardState.rabbits[i]}
                            flipped={isStackFlipped(i)}
                            hatSelected={isHatSelected(i)}
                            stackSelected={isStackSelected(i)}
                            onHatSelect={() => handleSelectHat(i)}
                            onStackSelect={() => handleSwapStack(i)}
                            onFlip={() => handleFlip(i)}
                        />
                    </div>
                ))}
        </div>
    );
};

export default Playground;
