import React, { useState, useRef, useEffect } from 'react'
import './ChatBotApp.css'

// Demo responses for when API is not available
const DEMO_RESPONSES = [
  "Hello! I'm XENO, your AI assistant. How can I help you today?",
  "That's an interesting question. Let me think about that...",
  "I'm a demo version right now. To use the real AI, you'll need to set up your Hugging Face API key.",
  "I can help with a wide range of topics, from answering questions to creative writing.",
  "If you're seeing this message, it means you're in demo mode without an API connection.",
  "The weather is always sunny in demo mode!",
  "I'm afraid I can't provide real-time data in demo mode.",
  "That's a great point! I'd love to discuss that further.",
  "In demo mode, I provide pre-written responses instead of using the Hugging Face API."
];

const ChatBotApp = ({ onBackClick }) => {
  // State for managing chats
  const [chats, setChats] = useState([
    { id: 1, title: 'Chat 01/03/2025 09:42:59 PM' },
    { id: 2, title: 'Chat 01/03/2025 09:42:59 PM' },
    { id: 3, title: 'Chat 01/03/2025 09:42:59 PM' }
  ]);
  
  // State for current active chat
  const [activeChat, setActiveChat] = useState(1);
  
  // State for messages in the current chat
  const [messages, setMessages] = useState([]);
  
  // State for input message
  const [inputMessage, setInputMessage] = useState('');
  
  // State for loading/typing indicator
  const [isTyping, setIsTyping] = useState(false);
  
  // State for API status
  const [apiStatus, setApiStatus] = useState({ isWorking: false, error: null, demoMode: true });
  
  // Ref for chat container to auto-scroll
  const chatContainerRef = useRef(null);
  
  // Function to get a random demo response
  const getRandomDemoResponse = () => {
    const randomIndex = Math.floor(Math.random() * DEMO_RESPONSES.length);
    return DEMO_RESPONSES[randomIndex];
  };
  
  // Function to create a new chat
  const createNewChat = () => {
    const newChatId = chats.length > 0 ? Math.max(...chats.map(chat => chat.id)) + 1 : 1;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    const newChat = {
      id: newChatId,
      title: `Chat ${formattedDate}`
    };
    
    setChats([...chats, newChat]);
    setActiveChat(newChatId);
    setMessages([]);
  };
  
  // Function to delete a chat
  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    
    if (activeChat === chatId && updatedChats.length > 0) {
      setActiveChat(updatedChats[0].id);
    } else if (updatedChats.length === 0) {
      createNewChat();
    }
  };
  
  // Function to select a chat
  const selectChat = (chatId) => {
    setActiveChat(chatId);
    // In a real app, you would load messages for this chat from your backend/storage
    // For now, we'll just clear messages as a placeholder
    setMessages([]);
  };
  
  // Function to handle input change
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  
  // Function to send message to AI API
  const sendMessageToChatGPT = async (message) => {
    setIsTyping(true);
    
    // If in demo mode, use demo responses
    if (apiStatus.demoMode) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const demoResponse = getRandomDemoResponse();
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          text: demoResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      
      setIsTyping(false);
      return;
    }
    
    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Please add your Hugging Face API key to the .env file.");
      }
      
      console.log("Sending request to AI API...");
      
      // Format conversation for better context
      const conversationHistory = messages.slice(-3).map(msg => 
        `${msg.isUser ? 'Human: ' : 'Assistant: '}${msg.text}`
      ).join('\n');
      
      const prompt = `${conversationHistory}${conversationHistory ? '\n' : ''}Human: ${message}\nAssistant:`;
      
      const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            top_k: 50,
            top_p: 0.95
          }
        })
      });
      
      // Log response details for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received response from AI API:", data);
      
      if (Array.isArray(data) && data[0] && data[0].generated_text) {
        let aiResponse = data[0].generated_text.trim();
        
        // Get everything after the last "Assistant:" tag
        const lastAssistantIndex = aiResponse.lastIndexOf('Assistant:');
        if (lastAssistantIndex !== -1) {
          aiResponse = aiResponse.substring(lastAssistantIndex + 10).trim();
        }
        
        // Remove any remaining conversation markers and clean up
        aiResponse = aiResponse
          .replace(/^Assistant: /i, '')  // Remove any remaining "Assistant:" prefix
          .replace(/Human:.*$/s, '')     // Remove anything after "Human:"
          .replace(/API connection successful!.*?powered by Zephyr\./g, '')  // Remove welcome message
          .trim();
        
        // If response is empty after cleaning, use a fallback
        if (!aiResponse) {
          aiResponse = "Hello! How can I help you today?";
        }
        
        // Add AI response to messages
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: Date.now() + 1,
            text: aiResponse,
            isUser: false,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
        
        // Reset error state if successful
        setApiStatus(prev => ({
          ...prev,
          error: null,
          isWorking: true,
          demoMode: false
        }));
      } else {
        throw new Error("Unexpected response format from API");
      }
    } catch (error) {
      console.error('Error communicating with AI API:', error);
      
      // Network error handling
      const errorMessage = error.message === 'Failed to fetch' 
        ? 'Network error: Please check your internet connection and try again.'
        : `Error: ${error.message}`;
      
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: Date.now() + 1,
          text: errorMessage,
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
          isError: true
        }
      ]);
      
      setApiStatus(prev => ({
        ...prev,
        error: errorMessage,
        isWorking: false,
        demoMode: true
      }));
    } finally {
      setIsTyping(false);
    }
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    // Add user message to messages
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    
    // Send message to ChatGPT API
    await sendMessageToChatGPT(inputMessage);
  };
  
  // Toggle demo mode
  const toggleDemoMode = () => {
    setApiStatus(prev => ({
      ...prev,
      demoMode: !prev.demoMode
    }));
  };
  
  // Test API key on component mount
  useEffect(() => {
    const testApiKey = async () => {
      try {
        const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
        if (!apiKey) {
          throw new Error("API key is missing. Please add your Hugging Face API key to the .env file.");
        }
        
        console.log("Testing API key...");
        
        const response = await fetch('https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            inputs: "Human: Hi!\nAssistant:",
            parameters: {
              max_new_tokens: 100,
              temperature: 0.7,
              top_k: 50,
              top_p: 0.95
            }
          })
        });
        
        // Log response details
        console.log("Test response status:", response.status);
        console.log("Test response headers:", Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          const errorData = await response.json().catch(e => {
            console.error("Error parsing error response:", e);
            return { error: "Failed to parse error response" };
          });
          console.error("Full error data:", errorData);
          throw new Error(`API error: ${response.status} - ${errorData.error?.message || JSON.stringify(errorData)}`);
        }
        
        const data = await response.json().catch(e => {
          console.error("Error parsing success response:", e);
          throw new Error("Failed to parse API response");
        });
        console.log("Test response data:", data);
        
        setApiStatus({
          isWorking: true,
          error: null,
          demoMode: false
        });
        
        // Add welcome message
        setMessages([
          {
            id: Date.now(),
            text: "API connection successful! You can now chat with XENO AI powered by Zephyr.",
            isUser: false,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      } catch (error) {
        console.error("API Key Test Error:", error);
        
        setApiStatus({
          isWorking: false,
          error: error.message,
          demoMode: true
        });
        
        // Add welcome message explaining the issue
        setMessages([
          {
            id: Date.now(),
            text: `API connection error: ${error.message}. Using demo mode instead.`,
            isUser: false,
            timestamp: new Date().toLocaleTimeString(),
            isError: true
          }
        ]);
      }
    };
    
    testApiKey();
  }, []);
  
  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className='chat-app'>
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div 
              onClick={toggleDemoMode} 
              style={{ 
                cursor: 'pointer',
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: apiStatus.demoMode ? '#f42f5f' : '#2d3748',
                color: 'white',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {apiStatus.demoMode ? 'Demo Mode' : 'API Mode'}
            </div>
            <i className="bx bx-edit-alt new-chat" onClick={createNewChat}></i>
          </div>
        </div>
        
        {chats.map(chat => (
          <div 
            key={chat.id} 
            className={`chat-list-item ${activeChat === chat.id ? 'active' : ''}`}
            onClick={() => selectChat(chat.id)}
          >
            <h4>{chat.title}</h4>
            <i className="bx bx-x circle" onClick={(e) => deleteChat(chat.id, e)}></i>
          </div>
        ))}
        
        {onBackClick && (
          <div className="back-button" onClick={onBackClick}>
            <i className="bx bx-arrow-back"></i>
            <span>Back to Start</span>
          </div>
        )}
      </div>
      
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with XENO {apiStatus.demoMode && <span style={{ fontSize: '14px', color: '#f42f5f' }}>(Demo Mode)</span>}</h3>
        </div>
        
        <div className="chat" ref={chatContainerRef}>
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h3>Welcome to XENO AI</h3>
              <p>Start a conversation by typing a message below.</p>
              {apiStatus.error && (
                <div style={{ marginTop: '20px', color: '#f42f5f', fontSize: '14px', maxWidth: '80%' }}>
                  <p><strong>API Status:</strong> Error</p>
                  <p>{apiStatus.error}</p>
                  <p>Using demo mode for now. Your messages will receive pre-written responses.</p>
                </div>
              )}
            </div>
          ) : (
            messages.map(message => (
              <div 
                key={message.id} 
                className={message.isUser ? "prompt" : message.isError ? "response error" : "response"}
              >
                {message.text}
                <span>{message.timestamp}</span>
              </div>
            ))
          )}
          
          {isTyping && <div className="typing">Typing...</div>}
        </div>
        
        <form className='msg-form' onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Type your message here...' 
            value={inputMessage}
            onChange={handleInputChange}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatBotApp;