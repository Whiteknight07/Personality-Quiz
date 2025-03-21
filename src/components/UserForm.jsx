import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const [inputName, setInputName] = useState('');
  const { setName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);  // Set the name in context
    navigate('/quiz');   // Navigate to quiz page
  }

  return (
    <div>
      <h2>Welcome to the Personality Quiz!</h2>
      <p>Enter your name to get started</p>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input 
            type="text" 
            value={inputName} 
            onChange={(e) => setInputName(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
} 