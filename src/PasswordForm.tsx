import React, { useState } from 'react';

interface Props {
  onPasswordSubmit: (isCorrect: boolean) => void;
}

export const PasswordForm: React.FC<Props> = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCorrect = password === 'titi';
    onPasswordSubmit(isCorrect);
    if (isCorrect) {
      console.log('Correct password submitted!');
    } else {
      console.log('Incorrect password submitted.');
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="password">Please enter the password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};
