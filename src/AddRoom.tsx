import React, { useState } from 'react';

interface Props {
  onAdd: (name: string) => void;
}

const AddRoom: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    onAdd(name);
    setName('');
  };

  return (
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add game
      </button>
    </div>
  );
};

export default AddRoom;
