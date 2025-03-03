# XENO AI - ChatGPT-Powered Chatbot

A sleek, modern chatbot application that uses OpenAI's ChatGPT API to provide intelligent responses.

## Features

- Multiple chat sessions
- Real-time conversation with ChatGPT
- Modern, responsive UI
- Session management
- Typing indicators

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd xeno-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up your OpenAI API key:
   - Rename `.env.example` to `.env` (or create a new `.env` file)
   - Add your OpenAI API key to the `.env` file:
     ```
     REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
     ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- Click the edit icon in the chat list header to create a new chat
- Type your message in the input field and press Enter or click Send
- Click on a chat in the list to switch between conversations
- Click the X icon to delete a chat

## Dependencies

- React
- OpenAI API

## Notes

- This application requires an active internet connection to communicate with the OpenAI API
- API usage may incur costs depending on your OpenAI plan
- Make sure to keep your API key secure and never commit it to version control

## License

MIT

