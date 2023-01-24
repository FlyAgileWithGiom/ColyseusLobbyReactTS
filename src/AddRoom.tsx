import React, { useState } from 'react';

interface AddRoomProps {
  onCreateRoom: (name: string) => void;
}

const AddRoom: React.FC<AddRoomProps> = ({ onCreateRoom }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreateRoom(name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room name:
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default AddRoom;
