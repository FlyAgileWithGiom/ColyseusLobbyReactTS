import React, {useState} from 'react';

interface AddRoomProps {
  onAddRoom: (title: string) => void;
}

const AddRoom: React.FC<AddRoomProps> = ({onAddRoom}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddRoom(title);
    setTitle("");
  };

  return (
      <form onSubmit={handleSubmit}>
        <label>
            Create Game:
            <input
                type="text"
                value={title}
                placeholder="game title"
                onChange={event => setTitle(event.target.value)}
            />
        </label>
          <button type="submit">Create</button>
    </form>
  );
};

export default AddRoom;
