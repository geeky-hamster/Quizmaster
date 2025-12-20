import React, { useState, useEffect, ReactNode } from 'react';
import { Container, Row, Col, Card, ListGroup, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllSubjects, getChaptersBySubject, getQuizzesByChapter, Subject, Chapter, Quiz } from '../../services/api';
import Navigation from '../common/Navigation';
import './QuizList.css';

const QuizList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initLoading, setInitLoading] = useState<boolean>(true);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setInitLoading(true);
        setError(null);
        
        const response = await getAllSubjects();
        console.log('Subjects data:', response.data);
        setSubjects(response.data);
        
        // If subjects exist, select the first one by default
        if (response.data.length > 0) {
          setSelectedSubject(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setError('Failed to load subjects. Please try again later.');
      } finally {
        setInitLoading(false);
      }
    };
    
    fetchSubjects();
  }, []);

  // Fetch chapters when subject changes
  useEffect(() => {
    const fetchChapters = async () => {
      if (selectedSubject === null) return;
      
      try {
        setLoading(true);
        setError(null);
        setChapters([]);
        setQuizzes([]);
        setSelectedChapter(null);
        
        const response = await getChaptersBySubject(selectedSubject);
        console.log('Chapters data:', response.data);
        setChapters(response.data);
        
        // If chapters exist, select the first one by default
        if (response.data.length > 0) {
          setSelectedChapter(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setError('Failed to load chapters. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchChapters();
  }, [selectedSubject]);

  // Fetch quizzes when chapter changes
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (selectedChapter === null) return;
      
      try {
        setLoading(true);
        setError(null);
        setQuizzes([]);
        setDataFetched(false);
        
        const response = await getQuizzesByChapter(selectedChapter);
        console.log('Fetched quizzes:', response.data);
        
        if (Array.isArray(response.data)) {
        setQuizzes(response.data);
        } else {
          console.error('Quiz data is not an array:', response.data);
          setError('Received invalid quiz data from server');
        }
        
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, [selectedChapter]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = parseInt(e.target.value);
    setSelectedSubject(subjectId);
  };

  const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chapterId = parseInt(e.target.value);
    setSelectedChapter(chapterId);
  };

  // Get quiz title with fallbacks for alternative field names
  const getQuizTitle = (quiz: any): string => {
    if (quiz.title && typeof quiz.title === 'string') return quiz.title;
    if (quiz.name && typeof quiz.name === 'string') return quiz.name;
    return 'Quiz Title Not Available';
  };

  // Get quiz description with fallbacks
  const getQuizDescription = (quiz: any): string => {
    if (quiz.description && typeof quiz.description === 'string') return quiz.description;
    if (quiz.remarks && typeof quiz.remarks === 'string') return quiz.remarks;
    return 'No description available';
  };

  // Get time limit with fallbacks
  const getTimeLimit = (quiz: any): string => {
    if (quiz.timeLimit && (typeof quiz.timeLimit === 'number' || typeof quiz.timeLimit === 'string')) 
      return String(quiz.timeLimit);
    if (quiz.time_duration && (typeof quiz.time_duration === 'number' || typeof quiz.time_duration === 'string')) 
      return String(quiz.time_duration);
    return '0';
  };

  // Get passing score with fallbacks
  const getPassingScore = (quiz: any): string => {
    if (quiz.passingScore && (typeof quiz.passingScore === 'number' || typeof quiz.passingScore === 'string')) 
      return String(quiz.passingScore);
    if (quiz.passing_score && (typeof quiz.passing_score === 'number' || typeof quiz.passing_score === 'string')) 
      return String(quiz.passing_score);
    return '0';
  };

  if (initLoading) {
    return (
      <>
        <Navigation />
        <Container className="quiz-list-container text-center py-5">
          <Spinner animation="border" role="status" className="my-5">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading subjects and quizzes...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container className="quiz-list-container">
        <div className="quiz-list-header">
          <h2 className="quiz-list-title">Available Quizzes</h2>
          <p className="quiz-list-description">Select a subject and chapter to view available quizzes</p>
        </div>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Header as="h5" className="bg-primary text-white">Filter Quizzes</Card.Header>
              <Card.Body className="quiz-filter-bar">
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Subject</Form.Label>
                    <Form.Select
                      value={selectedSubject || ''}
                      onChange={handleSubjectChange}
                      disabled={loading || subjects.length === 0}
                      className="form-select-custom"
                    >
                      {subjects.length === 0 && (
                        <option value="">No subjects available</option>
                      )}
                      {subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name || `Subject ${subject.id}`}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Select Chapter</Form.Label>
                    <Form.Select
                      value={selectedChapter || ''}
                      onChange={handleChapterChange}
                      disabled={loading || chapters.length === 0}
                      className="form-select-custom"
                    >
                      {chapters.length === 0 && (
                        <option value="">No chapters available</option>
                      )}
                      {chapters.map(chapter => (
                        <option key={chapter.id} value={chapter.id}>
                          {chapter.name || `Chapter ${chapter.id}`}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            
            <Card className="shadow-sm">
              <Card.Header as="h5" className="bg-primary text-white">Navigation</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item action as={Link} to="/dashboard" className="nav-link-item">
                  <i className="fas fa-tachometer-alt me-2"></i> Back to Dashboard
                </ListGroup.Item>
                <ListGroup.Item action as={Link} to="/profile" className="nav-link-item">
                  <i className="fas fa-user-circle me-2"></i> Your Profile
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header as="h5" className="bg-primary text-white d-flex justify-content-between align-items-center">
                <span>Quizzes {dataFetched && quizzes.length > 0 ? `(${quizzes.length})` : ''}</span>
                {loading && <Spinner animation="border" size="sm" className="ms-2" />}
              </Card.Header>
              
              {dataFetched && quizzes.length > 0 ? (
                <ListGroup variant="flush">
                  {quizzes.map((quiz, index) => (
                    <ListGroup.Item
                      key={quiz.id || index}
                      className="quiz-card"
                      style={{ '--i': index } as React.CSSProperties}
                    >
                      <div className="quiz-card-content">
                        <h4 className="quiz-title">
                          {getQuizTitle(quiz)}
                        </h4>
                        
                        <p className="quiz-description">
                          {getQuizDescription(quiz)}
                        </p>
                        
                        <div className="quiz-meta">
                          <div className="quiz-meta-item">
                            <span className="quiz-meta-label">Time Limit:</span>
                            <span className="quiz-meta-value">
                              {getTimeLimit(quiz)} minutes
                            </span>
                          </div>
                          
                          <div className="quiz-meta-item">
                            <span className="quiz-meta-label">Passing Score:</span>
                            <span className="quiz-meta-value">
                              {getPassingScore(quiz)}%
                            </span>
                          </div>
                          
                          {quiz.date_of_quiz && (
                            <div className="quiz-meta-item">
                              <span className="quiz-meta-label">Date:</span>
                              <span className="quiz-meta-value">{quiz.date_of_quiz}</span>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="primary"
                          className="start-quiz-btn mt-3"
                          as={Link}
                          to={`/quiz/${quiz.id}`}
                        >
                          Start Quiz
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Card.Body className="text-center py-5">
                  {loading ? (
                    <div className="py-4">
                      <Spinner animation="border" />
                      <p className="mt-3">Loading quizzes...</p>
                    </div>
                  ) : (
                    <div className="no-quizzes">
                      <i className="fas fa-book-reader display-4 d-block mb-3"></i>
                      <p className="no-quizzes-message">No quizzes available for the selected chapter.</p>
                      <p>Please select a different chapter or check back later.</p>
                    </div>
                  )}
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QuizList; 