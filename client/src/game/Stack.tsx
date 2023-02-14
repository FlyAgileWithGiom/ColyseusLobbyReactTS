import React from 'react';
import Hat from "./Hat";
import Rabbit from "./Rabbit";

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

const Stack: React.FC<StackProps> = (props) => {

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        if (event.shiftKey) {
            props.onStackSelect();
        } else if (event.altKey) {
            props.onFlip();
        } else {
            props.onHatSelect();
        }
    };

    let hatClass = `transition ease-in-out duration-500 ${props.hatSelected || props.stackSelected ? '-translate-y-10' : ' translate-y-0'}`;
    let stackClass = `transition ease-in-out duration-500 ${props.stackSelected ? '-translate-y-10' : ' translate-y-0'}`;
    return (
        <div
            onClick={handleClick}
            className="flex flex-col items-center"
        >
            <div
                className={hatClass}>
                <Hat number={props.hatNumber} flipped={props.flipped}/>
            </div>
            <div className={stackClass}>
                <Rabbit number={props.rabbitNumber} flipped={!props.flipped}/>
            </div>
        </div>
    );
};

export default Stack;
