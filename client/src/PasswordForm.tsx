import React, { useState } from 'react';
export interface Props {
  onAuthentOk: () => void;
}

export const PasswordForm: React.FC<Props> = ({ onAuthentOk }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "titi") {
      onAuthentOk();
    } else {
      alert("Incorrect password. Please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Connect</button>
    </form>
  );
};