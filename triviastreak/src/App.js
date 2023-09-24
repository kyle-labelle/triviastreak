import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userChoice, setUserChoice] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  const fetchQuestion = async () => {
    try {
      const apiUrl = 'https://opentdb.com/api.php';
      const amount = 1;
      const difficulty = 'easy';
      const type = 'boolean';
      const category = 9; // General Knowledge

      const response = await fetch(`${apiUrl}?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`);

      if (response.status === 200) {
        const data = await response.json();
        if (data.results.length > 0) {
          const questionData = data.results[0];
          setQuestion(questionData.question);
          setCorrectAnswer(questionData.correct_answer);
        } else {
          console.log('No results found.');
        }
      } else {
        console.error('Error fetching question:', response.statusText);
      }

      // Reset game state
      setUserChoice('');
      setShowSuccessMessage(false);
      setShowFailureMessage(false);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleUserChoice = (choice) => {
    setUserChoice(choice);

    if (choice === correctAnswer) {
      setShowSuccessMessage(true);
    } else {
      setShowFailureMessage(true);
    }
  };

  return (
    <div className="App">
      <h1>Trivia Streak</h1>
      <button onClick={fetchQuestion}>Fetch Question</button>
      {question && ( //check if question is not empty (condiotional rendering) 
        <div>
          <p>Question: {question}</p>
          {showSuccessMessage && ( 
            <p>Success! You answered correctly.</p>
          )}
          {showFailureMessage && (
            <p>Incorrect! The correct answer was: {correctAnswer}</p>
          )}
          {showSuccessMessage || showFailureMessage ? ( //? operator for condition ? true : false (if else)
            <button onClick={fetchQuestion}>Next Question</button>
          ) : (
            <div>
              <button onClick={() => handleUserChoice('True')}>True</button>
              <button onClick={() => handleUserChoice('False')}>False</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default App;