import React, {useState} from 'react';
import Stack from './Stack';

interface PlaygroundProps {
    hats: number[];
    rabbits: number[];
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
        resetSwapStacks()
    }

    function triggerSwapStack(i: number, j: number) {
        props.onSwapStacks(i, j);
        resetSwapHats()
        resetSwapStacks()
    }

    function resetSwapHats() {
        setFirstSwappedHat1(null)
        setFirstSwappedHat2(null)
    }

    function resetSwapStacks() {
        setFirstSwappedStack1(null)
        setFirstSwappedStack2(null)
    }


    const handleSwapHat = (number: number) => {
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

    const handleSwapStack = (number: number) => {
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

    const handleFlip = (number: number) => {
        resetSwapHats()
        resetSwapStacks()
        setFlippedStack(number)
        props.onFlipStack(number);
    }

    function isHatSelected(i: number) {
        return (firstSwappedHat1 !== null && firstSwappedHat1 === i) || (firstSwappedHat2 !== null && firstSwappedHat2 === i);
    }

    function isStackSelected(i: number) {
        return firstSwappedStack1 !== null && (firstSwappedStack1 === i || firstSwappedStack2 === i);
    }

    return (
        <div className="flex flex-row my-20">
            {
                Array.from({length: props.hats.length}, (_, i) => (
                    <div className="">

                        <Stack
                            key={i}
                            hatNumber={props.hats[i]}
                            rabbitNumber={props.rabbits[i]}
                            onHatSelect={() => handleSwapHat(i)}
                            onStackSelect={() => handleSwapStack(i)}
                            onFlip={() => handleFlip(i)}
                            flipped={flippedStack === i}
                            hatSelected={isHatSelected(i)}
                            stackSelected={isStackSelected(i)}/>
                    </div>
                ))}
        </div>
    );
};

export default Playground;
