import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

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
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="App">
      <h1>Trivia Streak</h1>
      <button onClick={fetchQuestion}>Fetch Question</button>
      {question && (
        <div>
          <p>Question: {question}</p>
          <p>Correct Answer: {correctAnswer}</p>
          <button>True</button>
          <button>False</button>
        </div>
      )}
    </div>
  );
}

export default App;
