import React from 'react'
import './ChatBotApp.css'

const ChatBotApp = () => {
  return (
    <div className='chat-app'>
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat 01/03/2025 09:42:59 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat 01/03/2025 09:42:59 PM</h4>
          <i className="bx bx-x circle"></i>
        </div><div className="chat-list-item">
          <h4>Chat 01/03/2025 09:42:59 PM</h4>
          <i className="bx bx-x circle"></i>
        </div>
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx-bx-arrow-back-back"></i>
        </div>
        <div className="chat">
          <div className="prompt">Hi how are you?
           <span>12:59:51 PM</span></div>
           <div className="response">Hello! how high are you?
            you seem pretty high to me. btw i am XENO the 
            smartest AI present
           <span>12:59:52 PM</span></div>
           <div className="typing">Typing...</div>
        </div>
        <form className='msg-form'>
          <input type="text" placeholder='Type your message here...' />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}
export default ChatBotApp;