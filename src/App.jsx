import React, { useState } from 'react';
import ChatBotStart from './Components/ChatBotStart';
import ChatBotApp from './Components/ChatBotApp';
import './App.css';

const App = () => {
  const [showChatApp, setShowChatApp] = useState(false);

  const handleStartClick = () => {
    setShowChatApp(true);
  };
  
  const handleBackClick = () => {
    setShowChatApp(false);
  };

  return (
    <div className="app-container">
      {showChatApp ? (
        <ChatBotApp onBackClick={handleBackClick} />
      ) : (
        <ChatBotStart onStartClick={handleStartClick} />
      )}
    </div>
  );
};

export default App;
