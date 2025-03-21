import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Question from './components/Question';
import Results from './components/Results';
import UserForm from './components/UserForm';
import { UserProvider } from './components/UserContext';
import './App.css';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState('');
  const [artwork, setArtwork] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "What's your favorite season?",
      options: ["Summer ☀️", "Winter ❄️", "Spring 🌸", "Fall 🍂"],
    },
    {
      question: "What's your ideal vacation?",
      options: ["Mountain hiking 🏔️", "Beach relaxation 🏖️", "Forest camping 🌲", "Desert adventure 🏜️"],
    },
    {
      question: "Which animal do you connect with most?",
      options: ["Lion 🦁", "Dolphin 🐬", "Deer 🦌", "Eagle 🦅"],
    },
    {
      question: "How do you handle stress?",
      options: ["Exercise 🏃", "Meditation 🧘", "Gardening 🌱", "Reading 📚"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",
    "Summer ☀️": "Fire",
    "Winter ❄️": "Water",
    "Spring 🌸": "Earth",
    "Fall 🍂": "Air",
    "Mountain hiking 🏔️": "Earth",
    "Beach relaxation 🏖️": "Water",
    "Forest camping 🌲": "Earth",
    "Desert adventure 🏜️": "Fire",
    "Lion 🦁": "Fire",
    "Dolphin 🐬": "Water",
    "Deer 🦌": "Earth",
    "Eagle 🦅": "Air",
    "Exercise 🏃": "Fire",
    "Meditation 🧘": "Air",
    "Gardening 🌱": "Earth",
    "Reading 📚": "Water",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  async function fetchArtwork(keyword) {
    try {
      // First fetch the object IDs based on the keyword
      const searchResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);
      const searchData = await searchResponse.json();
      
      // Get a random object ID from the results
      const randomIndex = Math.floor(Math.random() * Math.min(searchData.objectIDs.length, 20));
      const objectId = searchData.objectIDs[randomIndex];
      
      // Then fetch the details of the object
      const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
      const objectData = await objectResponse.json();
      
      // Only set the artwork if it has a primary image
      if (objectData.primaryImage) {
        setArtwork(objectData);
      } else {
        // If no primary image, try another object
        fetchArtwork(keyword);
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length && answers.length > 0) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex, answers]);

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<UserForm />} />
              <Route
                path="/quiz"
                element={
                  currentQuestionIndex < questions.length ? (
                    <Question 
                      question={questions[currentQuestionIndex].question} 
                      options={questions[currentQuestionIndex].options} 
                      onAnswer={handleAnswer} 
                    />
                  ) : (
                    <Results element={element} artwork={artwork} />
                  )
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
