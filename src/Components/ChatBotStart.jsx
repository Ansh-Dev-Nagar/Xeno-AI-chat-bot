import React from 'react';
import './ChatBotStart.css';

const ChatBotStart = ({ onStartClick }) => {
  return (
    <div className="start-page">
      <div className="start-content">
        <h1>Welcome to XENO AI</h1>
        <p>Your intelligent conversation partner made by Ansh Dev Nagar</p>
        <button className="start-button" onClick={onStartClick}>
          <i className='bx bx-message-square-dots'></i>
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default ChatBotStart; 