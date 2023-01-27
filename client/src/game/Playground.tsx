import React, {useState} from 'react';
import Stack from './Stack';

interface PlaygroundProps {
    hatsOrder: number[];
    rabbitsOrder: number[];
    onSwapStacks: (from: number, to: number) => void;
    onSwapHats: (from: number, to: number) => void;
    onFlipStack: (stackNumber: number) => void;
}

const Playground: React.FC<PlaygroundProps> = (props) => {
    const [firstSwappedHat1, setFirstSwappedHat1] = useState<number | null>(null);
    const [firstSwappedHat2, setFirstSwappedHat2] = useState<number | null>(null);
    const [firstSwappedStack1, setFirstSwappedStack1] = useState<number | null>(null);
    const [firstSwappedStack2, setFirstSwappedStack2] = useState<number | null>(null);
    const [flippedStack, setFlippedStack] = useState<number | null>(null);

    function triggerSwapHats(i: number, j: number) {
        props.onSwapHats(i, j);
        resetSwapHats()
    }

    function resetSwapStacks() {
        setFirstSwappedStack1(null)
        setFirstSwappedStack2(null)
    }

    const handleSwapHat = (event: React.MouseEvent<HTMLElement>, number: number) => {
        event.preventDefault();
        // cancel other action
        resetSwapStacks();

        // first clicked
        if (firstSwappedHat1 === null) {
            setFirstSwappedHat1(number);
        } else {
            // second clicked,
            // ignore same hat
            if (number === firstSwappedHat1)
                return;
            // validate swap and reset
            setFirstSwappedHat2(number)
            triggerSwapHats(firstSwappedHat1, number);
        }
    }

    function triggerSwapStack(i: number, j: number) {
        props.onSwapStacks(i, j);
        resetSwapStacks()
    }

    function resetSwapHats() {
        setFirstSwappedHat1(null)
        setFirstSwappedHat2(null)
    }

    const handleSwapStack = (event: React.MouseEvent<HTMLElement>, number: number) => {
        event.preventDefault();
        // cancel other action
        resetSwapHats();

        // first clicked
        if (firstSwappedStack1 === null) {
            setFirstSwappedStack1(number);
        } else {
            // second clicked,
            // ignore same stack
            if (number === firstSwappedStack1)
                return;
            // validate swap and reset
            setFirstSwappedStack2(number)
            triggerSwapStack(firstSwappedStack1, number);
        }
    }

    const handleFlip = (event: React.MouseEvent<HTMLElement>, number: number) => {
        event.preventDefault();
        resetSwapHats()
        resetSwapStacks()
        setFlippedStack(number)
        props.onFlipStack(number);
    }

    return (
        <div className="stacks-container d-flex">

            {
                Array.from({length: props.hatsOrder.length}, (_, i) => (

                    <Stack
                        key={i}
                        hatNumber={props.hatsOrder[i]}
                        rabbitNumber={props.rabbitsOrder[i]}
                        onClick={(event) => handleSwapHat(event, i)}
                        onContextClick={(event) => handleSwapStack(event, i)}
                        onShiftClick={(event) => handleFlip(event, i)}
                        flipped={flippedStack === i}
                        hatSelected={firstSwappedHat1 !== null && i in [firstSwappedHat1, firstSwappedHat2]}
                        stackSelected={firstSwappedStack1 !== null && i in [firstSwappedStack1, firstSwappedStack2]}/>
                ))}
        </div>
    );
};

export default Playground;
