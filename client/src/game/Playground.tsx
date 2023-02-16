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
    flippedStacks: number
}

function cloneBoardState(state: BoardStateItf) {
    return {
        hats: [...state.hats],
        rabbits: [...state.rabbits],
        selectedHats: [...state.selectedHats],
        selectedStacks: [...state.selectedStacks],
        flippedStacks: state.flippedStacks
    }
}

const Playground: React.FC<PlaygroundProps> = (props) => {
    const [boardState, setBoardState] = useState<any>(cloneBoardState(props.room.state));
    const [swapping, setSwapping] = useState<boolean>(false);

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
        props.room.send('flipStack', {stackNumber: number})
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
        <div className="flex flex-row my-20">
            {
                Array.from({length: boardState.hats.length}, (_, i) => (
                    <div className="">
                        <Stack
                            key={i}
                            hatNumber={boardState.hats[i]}
                            rabbitNumber={boardState.rabbits[i]}
                            onHatSelect={() => handleSelectHat(i)}
                            onStackSelect={() => handleSwapStack(i)}
                            onFlip={() => handleFlip(i)}
                            // TODO technically these should be mutually exclusive
                            flipped={isStackFlipped(i)}
                            hatSelected={isHatSelected(i)}
                            stackSelected={isStackSelected(i)}
                            swapping={swapping}
                        />
                    </div>
                ))}
        </div>
    );
};

export default Playground;
