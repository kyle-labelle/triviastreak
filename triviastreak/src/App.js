import React, { useState, useEffect } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [userChoice, setUserChoice] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const apiUrl = 'https://opentdb.com/api.php';
      const amount = 1;
      const category = 9; // General Knowledge
      
      const type = Math.random() < 0.5 ? 'multiple' : 'boolean'; //boolean / multiple


      if (score >= 10) {
        setDifficulty('hard');
      } else if (score >= 5) {
        setDifficulty('medium');
      }

      const response = await fetch(`${apiUrl}?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`);

      if (response.status === 200) {
        const data = await response.json();
        if (data.results.length > 0) {
          const questionData = data.results[0];
          setQuestion(questionData.question);
          setAnswers([questionData.correct_answer, ...questionData.incorrect_answers].sort(() => Math.random() - 0.5)); //... spread operator, math.random to shuffle array
          setCorrectAnswer(questionData.correct_answer);
        } else {
          console.log('No results found.');
        }
      } else {
        console.error('Error fetching question:', response.statusText);
      }
      setUserChoice('');
      setShowResult(false);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    setShowResult(true);

    if (choice === correctAnswer) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
  };

  return (
    <div className="App">
      <h1>Trivia Streak</h1>
      <p>Score: {score}</p>
      <p>Difficulty: {difficulty}</p>
      <button onClick={fetchQuestion}>Fetch Question</button>
      {question && ( //check if question is not empty (condiotional rendering) 
        <div>
          <p>Question: {question}</p>
          <div>
            {answers.map((answer, index) => (
              <button key={index} onClick={() => handleUserChoice(answer)} disabled={showResult}>
                {answer}
              </button>
            ))}
          </div>
          {showResult && (
            <div>
              {userChoice === correctAnswer ? (
                <p>Correct!</p>
              ) : (
                <p>Incorrect! The correct answer is: {correctAnswer}</p>
              )}
              <button onClick={fetchQuestion}>Next Question</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default App;