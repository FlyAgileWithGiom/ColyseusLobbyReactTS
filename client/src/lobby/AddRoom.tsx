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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
                    type="submit">Create
            </button>
        </form>
    );
};

export default AddRoom;
