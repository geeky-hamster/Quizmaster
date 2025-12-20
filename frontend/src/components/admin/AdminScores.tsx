import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Alert, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllScores, getQuizById, Score } from '../../services/api';
import Navigation from '../common/Navigation';
import './AdminScores.css';

const AdminScores: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [filteredScores, setFilteredScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterQuiz, setFilterQuiz] = useState<string>('');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getAllScores();
        setScores(response.data);
        setFilteredScores(response.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError('Failed to load scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchScores();
  }, []);

  useEffect(() => {
    // Apply filters when searchTerm or filterQuiz changes
    let results = scores;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(score => 
        (score.user?.username?.toLowerCase().includes(term) || 
         score.user?.fullName?.toLowerCase().includes(term))
      );
    }
    
    if (filterQuiz) {
      results = results.filter(score => 
        score.quiz_id.toString() === filterQuiz
      );
    }
    
    setFilteredScores(results);
  }, [searchTerm, filterQuiz, scores]);
  
  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Calculate percentage
  const calculatePercentage = (score: Score): number => {
    if (!score.total_questions || score.total_questions === 0) return 0;
    return Math.round((score.total_scored / score.total_questions) * 100);
  };
  
  // Get score status
  const getScoreStatus = (score: Score): string => {
    const percentage = calculatePercentage(score);
    const passingScore = score.quiz?.passingScore || 70;
    
    return percentage >= passingScore ? 'Passed' : 'Failed';
  };
  
  // Get unique quizzes for filter
  const getUniqueQuizzes = (): {id: number, title: string}[] => {
    // Create an object to track unique quiz IDs
    const uniqueQuizMap: Record<number, boolean> = {};
    const uniqueQuizIds: number[] = [];
    
    // Collect unique quiz IDs
    scores.forEach(score => {
      if (!uniqueQuizMap[score.quiz_id]) {
        uniqueQuizMap[score.quiz_id] = true;
        uniqueQuizIds.push(score.quiz_id);
      }
    });
    
    return uniqueQuizIds.map(id => {
      const quizScore = scores.find(score => score.quiz_id === id);
      return {
        id: id,
        title: quizScore?.quiz?.title || quizScore?.quiz?.name || `Quiz ${id}`
      };
    });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <Container className="mt-4 text-center">
          <Spinner animation="border" />
          <p>Loading scores...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container className="admin-scores-container mt-4">
        <h2 className="admin-scores-title">Quiz Scores</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Card className="admin-scores-filter-card">
          <Card.Body>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group className="admin-filter-form-group">
                  <Form.Label className="admin-filter-label">Search by Username or Full Name</Form.Label>
                  <Form.Control
                    className="admin-filter-input"
                    type="text"
                    placeholder="Search by username or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group className="admin-filter-form-group">
                  <Form.Label className="admin-filter-label">Filter by Quiz</Form.Label>
                  <Form.Select
                    className="admin-filter-select"
                    value={filterQuiz}
                    onChange={(e) => setFilterQuiz(e.target.value)}
                  >
                    <option value="">All Quizzes</option>
                    {getUniqueQuizzes().map(quiz => (
                      <option key={quiz.id} value={quiz.id}>
                        {quiz.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {filteredScores.length === 0 ? (
          <Alert variant="info">No matching scores found.</Alert>
        ) : (
          <Table striped bordered hover responsive className="admin-scores-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Quiz</th>
                <th>Date</th>
                <th>Score</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Time Taken</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.map(score => (
                <tr key={score.id}>
                  <td>{score.user?.fullName || score.user?.username || 'User'}</td>
                  <td>{score.quiz?.title || score.quiz?.name || `Quiz ${score.quiz_id}`}</td>
                  <td>{formatDate(score.time_stamp_of_attempt)}</td>
                  <td>{score.total_scored} / {score.total_questions}</td>
                  <td>{calculatePercentage(score)}%</td>
                  <td>
                    <span className={`badge bg-${getScoreStatus(score) === 'Passed' ? 'success' : 'danger'}`}>
                      {getScoreStatus(score)}
                    </span>
                  </td>
                  <td>{score.time_taken || 'N/A'}</td>
                  <td>
                    <Link to={`/results/${score.id}`} className="btn btn-sm btn-primary view-details-btn">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default AdminScores; 