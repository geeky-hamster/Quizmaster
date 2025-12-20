import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, ProgressBar, Alert, Spinner, Form, Modal } from 'react-bootstrap';
import { getQuizById, getQuestionsByQuizForUser, submitQuiz, Quiz, Question, Option } from '../../services/api';
import Navigation from '../common/Navigation';

interface QuizParams extends Record<string, string | undefined> {
  id: string;
}

interface Answer {
  question_id: number;
  selected_option: number;
}

const TakeQuiz: React.FC = () => {
  const { id } = useParams<QuizParams>();
  const navigate = useNavigate();
  const quizId = parseInt(id || '0');
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  
  const startTime = useRef<Date | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Fetch quiz and questions
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch quiz details
        const quizResponse = await getQuizById(quizId);
        const quizData = quizResponse.data;
        setQuiz(quizData);
        
        // Set timeLimit in seconds based on timeLimit or time_duration property
        let timeLimit = 30 * 60; // Default 30 minutes in seconds
        
        if (quizData.timeLimit && !isNaN(Number(quizData.timeLimit))) {
          // If timeLimit exists (in minutes), convert to seconds
          timeLimit = Number(quizData.timeLimit) * 60;
        } else if (quizData.time_duration && typeof quizData.time_duration === 'string') {
          try {
            // If time_duration exists in HH:MM format, parse and convert to seconds
            const timeParts = quizData.time_duration.split(':');
            if (timeParts.length >= 2) {
              const hours = parseInt(timeParts[0]) || 0;
              const minutes = parseInt(timeParts[1]) || 0;
              timeLimit = (hours * 60 * 60) + (minutes * 60);
            }
          } catch (error) {
            console.error('Error parsing time_duration:', error);
            // Keep the default time limit
          }
        }
        
        console.log('Setting time limit to:', timeLimit, 'seconds');
        setTimeLeft(timeLimit);
        
        // Fetch questions for user
        const questionsResponse = await getQuestionsByQuizForUser(quizId);
        const questionsData = questionsResponse.data;
        setQuestions(questionsData);
        
        // Initialize answers array
        const initialAnswers = questionsData.map(question => ({
          question_id: question.id,
          selected_option: -1 // -1 means not answered
        }));
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setError('Failed to load quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizData();
    
    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizId]);
  
  // Timer function
  useEffect(() => {
    if (!quizStarted || quizFinished) return;

    console.log('Starting timer with initial value:', timeLeft);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        // Validate that prevTime is a number
        if (typeof prevTime !== 'number' || isNaN(prevTime)) {
          console.error('Invalid timer value:', prevTime);
          // Reset to a valid value (5 minutes)
          return 300;
        }
        
        if (prevTime <= 1) {
          // Time's up - finish the quiz
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          // Show alert before finishing
          alert('Time is over! Your quiz has been submitted automatically.');
          finishQuiz();
          return 0;
        }
        
        // Log every minute for debugging
        if (prevTime % 60 === 0) {
          console.log('Timer update:', prevTime, 'seconds remaining');
        }
        
        return prevTime - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizStarted, quizFinished]);
  
  const startQuiz = () => {
    // Reset and start the timer
    let timeLimit = 30 * 60; // Default 30 minutes in seconds
    
    if (quiz?.timeLimit && !isNaN(Number(quiz.timeLimit))) {
      timeLimit = Number(quiz.timeLimit) * 60; // Convert minutes to seconds
    } else if (quiz?.time_duration && typeof quiz.time_duration === 'string') {
      try {
        const timeParts = quiz.time_duration.split(':');
        if (timeParts.length >= 2) {
          const hours = parseInt(timeParts[0]) || 0;
          const minutes = parseInt(timeParts[1]) || 0;
          timeLimit = (hours * 60 * 60) + (minutes * 60);
        }
      } catch (error) {
        console.error('Error parsing time_duration:', error);
        // Keep the default time limit
      }
    }
    
    console.log('Starting quiz with time limit:', timeLimit, 'seconds');
    setTimeLeft(timeLimit);
    setQuizStarted(true);
    startTime.current = new Date();
  };
  
  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
    
    // Update answers array
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex].selected_option = optionId;
    setAnswers(updatedAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(answers[currentQuestionIndex + 1].selected_option === -1 
        ? null 
        : answers[currentQuestionIndex + 1].selected_option);
    } else {
      setShowConfirmModal(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[currentQuestionIndex - 1].selected_option === -1 
        ? null 
        : answers[currentQuestionIndex - 1].selected_option);
    }
  };
  
  const finishQuiz = async () => {
    try {
      setQuizFinished(true);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      const endTime = new Date();
      const timeTaken = startTime.current 
        ? Math.floor((endTime.getTime() - startTime.current.getTime()) / 1000) 
        : 0;
      
      // Format time taken as HH:MM:SS
      const hours = Math.floor(timeTaken / 3600);
      const minutes = Math.floor((timeTaken % 3600) / 60);
      const seconds = timeTaken % 60;
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      // Filter out unanswered questions
      const validAnswers = answers.filter(answer => answer.selected_option !== -1);
      
      // Save answers to localStorage before submission
      localStorage.setItem(`quiz_${quizId}_answers`, JSON.stringify(validAnswers));
      
      const response = await submitQuiz({
        quiz_id: quizId,
        answers: validAnswers,
        time_taken: formattedTime
      });
      
      // Clear saved answers after successful submission
      localStorage.removeItem(`quiz_${quizId}_answers`);
      
      navigate(`/results/${response.data.score.id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz. Your answers have been saved. Please try again.');
      setQuizFinished(false);
    }
  };
  
  // Add useEffect to load saved answers
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`quiz_${quizId}_answers`);
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        setAnswers(parsedAnswers);
        // Restore the last answered question
        const lastAnsweredIndex = parsedAnswers.findIndex((a: any) => a.selected_option !== -1);
        if (lastAnsweredIndex !== -1) {
          setCurrentQuestionIndex(lastAnsweredIndex);
          setSelectedOption(parsedAnswers[lastAnsweredIndex].selected_option);
        }
      } catch (error) {
        console.error('Error loading saved answers:', error);
        localStorage.removeItem(`quiz_${quizId}_answers`);
      }
    }
  }, [quizId]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    // Check if seconds is a valid number
    if (isNaN(seconds) || seconds === undefined) {
      console.error('Invalid time value:', seconds);
      return '00:00'; // Return default value for invalid input
    }
    
    try {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60); // Ensure we have an integer
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return '00:00'; // Return default value in case of any error
    }
  };
  
  if (loading) {
    return (
      <>
        <Navigation />
        <Container className="quiz-loading-container">
          <div className="quiz-loading-spinner"></div>
          <div className="quiz-loading-text">
            <strong>Loading</strong><span className="quiz-loading-dots">...</span>
          </div>
        </Container>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Navigation />
        <Container className="mt-4">
          <Alert variant="danger">{error}</Alert>
          <Button variant="primary" onClick={() => navigate('/quizzes')}>
            Back to Quizzes
          </Button>
        </Container>
      </>
    );
  }
  
  if (!quizStarted) {
    return (
      <>
        <Navigation />
        <Container className="mt-4">
          <Card>
            <Card.Header as="h4">{quiz?.title}</Card.Header>
            <Card.Body>
              <Card.Title>Quiz Instructions</Card.Title>
              <Card.Text>{quiz?.description}</Card.Text>
              
              <div className="mb-4">
                <p><strong>Time Limit:</strong> {quiz?.timeLimit 
                    ? `${quiz.timeLimit} minutes` 
                    : quiz?.time_duration 
                      ? `${quiz.time_duration}` 
                      : '30 minutes'}</p>
                <p><strong>Passing Score:</strong> {quiz?.passingScore}%</p>
                <p><strong>Total Questions:</strong> {questions.length}</p>
              </div>
              
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={startQuiz}>
                  Start Quiz
                </Button>
                <Button variant="outline-secondary" onClick={() => navigate('/quizzes')}>
                  Back to Quizzes
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className={`quiz-timer ${timeLeft < 60 ? 'text-danger' : timeLeft < 300 ? 'text-warning' : ''}`}>
              Time Remaining: {formatTime(timeLeft)}
            </span>
          </Card.Header>
          
          <Card.Body>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-4" />
            
            <Card.Title as="h4">{currentQuestion?.question_statement || currentQuestion?.text}</Card.Title>
            
            <Form className="mt-4">
              {currentQuestion?.options ? (
                // If options array is available, use it
                currentQuestion.options.map(option => (
                  <Form.Check
                    key={option.id}
                    type="radio"
                    id={`option-${option.id}`}
                    name="quizOption"
                    label={option.text}
                    className="mb-3 fs-5"
                    checked={selectedOption === option.id}
                    onChange={() => handleOptionSelect(option.id)}
                  />
                ))
              ) : (
                // Otherwise, create options from option1-4 fields
                <>
                  {currentQuestion?.option1 && (
                    <Form.Check
                      type="radio"
                      id="option-1"
                      name="quizOption"
                      label={currentQuestion.option1}
                      className="mb-3 fs-5"
                      checked={selectedOption === 1}
                      onChange={() => handleOptionSelect(1)}
                    />
                  )}
                  {currentQuestion?.option2 && (
                    <Form.Check
                      type="radio"
                      id="option-2"
                      name="quizOption"
                      label={currentQuestion.option2}
                      className="mb-3 fs-5"
                      checked={selectedOption === 2}
                      onChange={() => handleOptionSelect(2)}
                    />
                  )}
                  {currentQuestion?.option3 && (
                    <Form.Check
                      type="radio"
                      id="option-3"
                      name="quizOption"
                      label={currentQuestion.option3}
                      className="mb-3 fs-5"
                      checked={selectedOption === 3}
                      onChange={() => handleOptionSelect(3)}
                    />
                  )}
                  {currentQuestion?.option4 && (
                    <Form.Check
                      type="radio"
                      id="option-4"
                      name="quizOption"
                      label={currentQuestion.option4}
                      className="mb-3 fs-5"
                      checked={selectedOption === 4}
                      onChange={() => handleOptionSelect(4)}
                    />
                  )}
                </>
              )}
            </Form>
          </Card.Body>
          
          <Card.Footer className="d-flex justify-content-between">
            <Button 
              variant="outline-secondary" 
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button 
              variant="primary" 
              onClick={goToNextQuestion}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Card.Footer>
        </Card>
      </Container>
      
      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Finish Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to finish this quiz?</p>
          <p>
            <strong>Answered Questions:</strong> {answers.filter(a => a.selected_option !== -1).length} of {questions.length}
          </p>
          {answers.filter(a => a.selected_option === -1).length > 0 && (
            <Alert variant="warning">
              You have {answers.filter(a => a.selected_option === -1).length} unanswered questions.
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Continue Quiz
          </Button>
          <Button variant="primary" onClick={finishQuiz}>
            Finish Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TakeQuiz; 