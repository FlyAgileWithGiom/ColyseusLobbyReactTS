import React, {useState} from 'react';
import {generateRoomName} from "./Lobby";

interface AddRoomProps {
    onAddRoom: (title: string) => void;
}

const AddRoom: React.FC<AddRoomProps> = ({onAddRoom}) => {
    const [title, setTitle] = useState(generateRoomName());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddRoom(title);
        setTitle(generateRoomName());
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                placeholder="game title"
                onChange={event => setTitle(event.target.value)}
            />
            <button type="submit">Create</button>
        </form>
    );
};

export default AddRoom;
