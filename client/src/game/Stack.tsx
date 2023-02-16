import React, {useEffect, useState} from 'react';
import Hat from "./Hat";
import Rabbit from "./Rabbit";

interface StackProps {
    hatNumber: number;
    rabbitNumber: number;
    flipped: boolean;
    hatSelected: boolean;
    swapping: boolean;
    stackSelected: boolean;
    onHatSelect: () => void;
    onFlip: () => void;
    onStackSelect: () => void;
}

const Stack: React.FC<StackProps> = (props) => {

    const [hatUp, setHatUp] = useState<boolean>(false);
    const [stackUp, setStackUp] = useState<boolean>(false);
    const [hatMarked, setHatMarked] = useState<boolean>(false);
    const [stackMarked, setStackMarked] = useState<boolean>(false);

    useEffect(() => {
        setHatUp(props.hatSelected || props.stackSelected);
    }, [props.hatSelected, props.stackSelected]);

    useEffect(() => {
        setStackUp(props.stackSelected);
    }, [props.stackSelected]);

    useEffect(() => {
        setHatMarked(props.swapping)
    }, [props.swapping])

    useEffect(() => {
        setStackMarked(props.swapping && props.stackSelected)
    }, [props.swapping])

    // useEffect(() => {
    //     if (props.hatSelected || props.stackSelected) {
    //         setTimeout(() => {
    //             setHatUp(false);
    //         }, 500);
    //     }
    // }, [props.stackSelected]);


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
            className="flex flex-col items-center"
        >
            <div
                className={`transition ease-in-out duration-500 \
                ${hatUp ? '-translate-y-10' : ' translate-y-0'} \
                ${hatMarked ? 'outline-blue-500' : ''} 
                `}>
                <Hat number={props.hatNumber} flipped={props.flipped}/>
            </div>
            <div
                className={`transition ease-in-out duration-500 \
                ${stackUp ? '-translate-y-10' : ' translate-y-0'}\
                ${stackMarked ? 'outline-blue-500' : ''}\
                
            `}>
                <Rabbit number={props.rabbitNumber} flipped={!props.flipped}/>
            </div>
        </div>
    );
};

export default Stack;
