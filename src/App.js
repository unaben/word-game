import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const levels = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "10" },
  ];

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [words, setwords] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  console.log({
    selectedLevel: selectedLevel,
    words: words,
    correctAnswers: correctAnswers,
    clicked: clicked,
    score: score,
  });

  function getRandomWords() {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_FETCH_URL}/results`, 
      params: { level: selectedLevel, area: "sat" },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("RES data:", response.data);
        setwords(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    if (selectedLevel) getRandomWords();
  }, [selectedLevel]);

  const checkAnswer = (option, optionIndex, selectedAnswer) => {
    console.log({ option: option });
    console.log({ optionIndex: optionIndex });
    console.log({ selectedAnswer: selectedAnswer });
    if (optionIndex === selectedAnswer) {
      setCorrectAnswers([...correctAnswers, option]);
      setScore((score) => score + 1);
    } else {
      setScore((score) => score - 1);
    }
    setClicked([...clicked, option]);
  };

  function handleWordChange(event) {
    setSelectedLevel(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="App">
      {!selectedLevel && (
        <div className="level-selector">
          <h1>Word Association App</h1>
          <p>Choose a level to start</p>
          <select
            name="levels"
            id="levels"
            value={selectedLevel}
            onChange={handleWordChange}
          >
            <option value="">Select Level</option>
            {levels.map((level) => (
              <option>{level.value}</option>
            ))}
            {/* <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option> */}
          </select>
        </div>
      )}
      {selectedLevel && words && (
        <div className="question-section">
          <h1>Selected Level: {selectedLevel} </h1>
          <h3>You scored: {score}</h3>
          <div className="questions">
            {words.quizlist.map((word, _wordIndex) => {
            
              return (
                <div key={_wordIndex} className="card-container">
                  {word.quiz.map((quiz, _index) => {
                    
                    return <p key={_index}>{quiz}</p>;
                  })}
                  <div className="question-buttons">
                    {word.option.map((option, optionIndex) => {
                      
                      return (
                        <div key={optionIndex} className="question-btn">
                          <button
                            disabled={clicked.includes(option)}
                            onClick={() =>
                              checkAnswer(option, optionIndex + 1, word.correct)
                            }
                          >
                            {option}
                          </button>
                          {correctAnswers.includes(option) && <p>correct!!!</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => setSelectedLevel(null)}>
            Back To Select Level
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
