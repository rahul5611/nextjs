import React, { useEffect, useState } from "react";
let data = require('../Static/questions.json')

// Sample questions data
const questions = data.questions;

const QuizComponent = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = (selectedAnswer) => {
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (questions && nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowScore(false);
    };

    return (
        <div className="App" style={{marginLeft: "20px"}}>
            <h1>React Quiz</h1>
            {showScore ? (
                <div className="score-section">
                    <p>
                        You scored {score} out of {questions.length}
                    </p>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                </div>
            ) : (
                <div className="question-section" style={{marginLeft: "30%"}}>
                    <div className="question-text">
                        <h2>{questions[currentQuestion].questionText}</h2>
                    </div>
                    <div className="options-section" >
                        {questions && questions[currentQuestion] && questions[currentQuestion].options.length > 0 && questions[currentQuestion].options.map((option, index) => (
                            <button key={index} onClick={() => handleAnswerOptionClick(option)} style={{marginRight: "12px", padding: "12px"}}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizComponent;
