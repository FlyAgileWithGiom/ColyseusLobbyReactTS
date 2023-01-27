import React from 'react'
import StackComponent, {Stack} from './Stack'

interface Props {
    stacks: Array<Stack>
}

const GameBoard: React.FC<Props> = ({ stacks }) => {
    return (
        <div className="stack-containers">
            {stacks.map((stack, index) => (
                <StackComponent key={index} hat={stack.hat} rabbit={stack.rabbit}/>
            ))}
        </div>
    );
}

export default GameBoard
