import React, {useEffect, useState} from 'react';
import {Hat, Rabbit} from "./Cards";

export const ANIMATION_STEP_PAUSE = 300;

interface StackProps {
    hatNumber: number;
    rabbitNumber: number;
    flipped: boolean;
    hatSelected: boolean;
    stackSelected: boolean;
    onHatSelect: () => void;
    onFlip: () => void;
    onStackSelect: () => void;
}

const Stack: React.FC<StackProps> = ({
                                         flipped,
                                         hatNumber,
                                         rabbitNumber,
                                         hatSelected,
                                         stackSelected,
                                         onFlip,
                                         onHatSelect,
                                         onStackSelect
                                     }) => {

    const [hatLifted, setHatLifted] = useState<boolean>(false);
    const [lifted, setLifted] = useState<boolean>(false);

    useEffect(() => {
        setHatLifted(hatSelected || stackSelected);
    }, [hatSelected, stackSelected]);

    useEffect(() => {
        setLifted(stackSelected);
    }, [stackSelected]);

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        console.log('click', event);
        if (event.altKey) {
            onFlip();
        } else if (event.shiftKey) {
            onStackSelect();
        } else {
            onHatSelect();
        }
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-col items-center"
        >
            <div
                className={`transition ease-in-out duration-${ANIMATION_STEP_PAUSE} 
                ${hatLifted ? '-translate-y-10 outline-blue-500' : ' translate-y-0'}  
                `}>
                <Hat number={hatNumber} flipped={flipped}/>
            </div>
            <div
                className={`transition ease-in-out duration-${ANIMATION_STEP_PAUSE} 
                ${lifted ? '-translate-y-10 outline-blue-500' : ' translate-y-0'}
                 s`}>
                <Rabbit number={rabbitNumber} flipped={!flipped}/>
            </div>
        </div>
    );
};

export default Stack;
