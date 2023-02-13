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

    const standApartClass = 'transform translate-y-10';
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

    return (
        <div
            onClick={handleClick}
        >
            <div className={props.hatSelected || props.stackSelected ? standApartClass : ''}>
                <Hat number={props.hatNumber} flipped={props.flipped}/>
            </div>
            <div className={props.stackSelected ? standApartClass : ''}>
                <Rabbit number={props.rabbitNumber} flipped={!props.flipped}/>
            </div>
        </div>
    );
};

export default Stack;
