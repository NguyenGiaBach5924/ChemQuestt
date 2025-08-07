import React, { useState } from 'react';
import { IMAGES } from "../constants/Constants.js";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // page index, each page has 2 questions
  const [selectedAnswers, setSelectedAnswers] = useState([]); // Track selected answers
  const [quizQuestions, setQuizQuestions] = useState([]);
  const navigate = useNavigate();

  // Debug logs
  console.log('Book render:', { isOpen, showQuiz, currentPage, quizQuestions });

  const questionsPerPage = 2;
  const totalPages = Math.ceil(quizQuestions.length / questionsPerPage);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleBookClick = () => {
    if (!isOpen) {
      setIsOpen(true); // Open the book
      fetchQuestions();
      setShowQuiz(true);
      setCurrentPage(0);
      setSelectedAnswers([]);
      console.log('Book clicked: opening book and fetching questions');
    }
  };

  const handleOptionClick = (qIdx, optionIdx) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[qIdx] = optionIdx;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFinish = () => {
    // Optionally, you can store the score or answers here before navigating
    navigate('/endgame');
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setCurrentPage(0);
    setSelectedAnswers([]);
    setIsOpen(false);
  };

  // Get questions for current page
  const startIdx = currentPage * questionsPerPage;
  const endIdx = Math.min(startIdx + questionsPerPage, quizQuestions.length);
  const questionsOnPage = quizQuestions.slice(startIdx, endIdx);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/quiz');
      const data = await response.json();
      setQuizQuestions(data);
      console.log('Fetched questions:', data);
    } catch (error) {
      alert('Failed to load quiz questions.');
      setQuizQuestions([]);
      console.log('Error fetching questions:', error);
    }
  };

  return (
    <>
      <div className="book-container">
        <button 
          onClick={handleBookClick}
          className="book-button"
        >
          <img 
            src={isOpen ? IMAGES.bookOpen : IMAGES.bookClosed}
            alt={isOpen ? "Open Book" : "Closed Book"}
            className="book-image"
          />
        </button>
      </div>

      {/* Quiz Popup */}
      {showQuiz && (
        <div className="quiz-popup-overlay">
          <div className="quiz-popup">
            {console.log('Rendering quiz popup', { showQuiz, quizQuestions, currentPage })}
            {/* Close button */}
            <button
              onClick={closeQuiz}
              className="quiz-close-button"
            >
              ×
            </button>

            {/* Quiz content */}
            {quizQuestions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <h2>Loading questions...</h2>
              </div>
            ) : (
              <div>
                <h2 className="quiz-title">
                  Chemistry Quiz
                </h2>
                <div className="quiz-question-info" style={{ display: 'flex', gap: 40, justifyContent: 'center' }}>
                  {questionsOnPage.map((q, idx) => {
                    const globalIdx = startIdx + idx;
                    return (
                      <div key={globalIdx} style={{ flex: 1, minWidth: 0 }}>
                        <p className="quiz-question-counter">
                          Question {globalIdx + 1} of {quizQuestions.length}
                        </p>
                        <h3 className="quiz-question">
                          {q.question}
                        </h3>
                        <div className="quiz-options">
                          {q.options.map((option, optionIdx) => (
                            <button
                              key={optionIdx}
                              onClick={() => handleOptionClick(globalIdx, optionIdx)}
                              className={`quiz-option-button${selectedAnswers[globalIdx] === optionIdx ? ' selected' : ''}`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {/* If only one question on last page, add empty right side for symmetry */}
                  {questionsOnPage.length === 1 && <div style={{ flex: 1 }}></div>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    style={{ opacity: currentPage === 0 ? 0.5 : 1 }}
                  >
                    Previous
                  </button>
                  {currentPage < totalPages - 1 ? (
                    <button
                      onClick={handleNext}
                      disabled={questionsOnPage.some((_, idx) => typeof selectedAnswers[startIdx + idx] === 'undefined')}
                      style={{ opacity: questionsOnPage.some((_, idx) => typeof selectedAnswers[startIdx + idx] === 'undefined') ? 0.5 : 1 }}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      disabled={questionsOnPage.some((_, idx) => typeof selectedAnswers[startIdx + idx] === 'undefined')}
                      style={{ opacity: questionsOnPage.some((_, idx) => typeof selectedAnswers[startIdx + idx] === 'undefined') ? 0.5 : 1 }}
                    >
                      Finish
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Book;
