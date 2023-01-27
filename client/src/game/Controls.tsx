import React from 'react';

interface ControlsProps {
    onEndTurn: () => void;
    nextDisabled: boolean;
}

const Controls: React.FC<ControlsProps> = (props) => {
    return (
        <div className="controls">
            <button type="button" onClick={props.onEndTurn} disabled={props.nextDisabled}>Next player</button>
        </div>
    );
};

export default Controls;
