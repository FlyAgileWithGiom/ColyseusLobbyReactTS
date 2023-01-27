import React from 'react';
import Hat from "./Hat";
import Rabbit from "./Rabbit";

interface StackProps {
    hatNumber: number;
    rabbitNumber: number;
    flipped: boolean;
    hatSelected: boolean;
    stackSelected: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    onShiftClick: (event: React.MouseEvent<HTMLElement>) => void;
    onContextClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const Stack: React.FC<StackProps> = (props) => {
    const stackClass = props.stackSelected ? 'stack-selected' : '';
    const hatClass = props.hatSelected ? 'hat-selected' : '';

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.shiftKey) {
            props.onShiftClick(event);
        } else {
            props.onClick(event);
        }
    }

    //todo flip each card, reversing the hiding, or flip the stack?

    return (
        <div
            className={`stack ${stackClass}`}
            onClick={(event) => handleClick(event)}
            onContextMenu={props.onContextClick}
        >
            <div className={hatClass}>
                <Hat number={props.hatNumber} flipped={!props.flipped}/>
            </div>
            <Rabbit number={props.rabbitNumber} flipped={props.flipped}/>
        </div>
    );
};

export default Stack;
