# Personality Quiz App

A React-based interactive personality quiz application that determines your elemental affinity (Fire, Water, Earth, or Air) based on your answers to a series of questions. The app displays artwork from the Metropolitan Museum of Art API based on your quiz result.

## Features

- User name personalization
- Interactive quiz questions with emoji-enhanced options
- Fetches and displays relevant artwork from the Metropolitan Museum of Art API
- Responsive design for various screen sizes

## Technologies Used

- React
- React Router for navigation
- Hooks for state management
- Context API for global state
- Fetch API for data retrieval

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the provided local URL (usually http://localhost:5173)

## Quiz Logic

The quiz determines your element (Fire, Water, Earth, or Air) based on which element received the most votes through your answers. Each answer is associated with an element, and the element with the highest count becomes your result.
