# XENO AI - Modern AI Chat Assistant

A sophisticated chat application built with React and powered by Hugging Face's Zephyr model. This project demonstrates the implementation of a modern AI chat interface with focus on user experience and clean design.

## Project Overview

XENO AI is developed to showcase the integration of large language models in a real-time chat environment. The application features a responsive design with a dark theme, focusing on both functionality and aesthetic appeal.

## Screenshots

### Welcome Screen
![Start Page](screenshots/landing%20page.png)
*Modern landing page with gradient design and welcome message*

### Chat Interface
![Chat Interface](screenshots/chat%20page.png)
*Main chat interface showcasing real-time AI conversation*

## Core Features

### Current Implementation
* Real-time AI chat integration using Zephyr model
* Multi-session management with separate chat contexts
* Responsive design with dark theme optimization
* Automatic demo mode fallback
* Real-time typing indicators
* Modern gradient UI elements
* Error handling and recovery

### Planned Enhancements
* Enhanced session management
  - Chat renaming capability
  - Session export functionality
  - Chat history persistence
* Advanced UI features
  - Theme customization
  - Chat search functionality
  - Message formatting options
* Progressive Web App (PWA) implementation

## Technical Stack

* Frontend: React + Vite
* AI Integration: Hugging Face's Zephyr model
* Styling: Custom CSS with animations
* JavaScript: ES6+ standards

## Setup Guide

1. Clone the repository:
```bash
git clone [your-repo-url]
cd xeno-ai
```

2. Install dependencies:
```bash
npm install
```

3. Configure API access:
```javascript

HUGGING_FACE_API_KEY: "your-api-key-here"
```

4. Launch development server:
```bash
npm run dev
```

## Development Notes

### API Configuration
The application requires a Hugging Face API key for full functionality. Without a valid API key, the system automatically operates in demo mode with pre-defined responses.

### Best Practices
* Keep API keys secure and never commit them to version control
* Test in both API and demo modes before deployment
* Follow the established code style and documentation patterns

## Contributing

Contributions are welcome. Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description
4. Ensure all tests pass

## Contact

For inquiries or collaboration opportunities, please reach out through:
anshdevnagar@gmail.com

---
Developed by Ansh Dev Nagar

