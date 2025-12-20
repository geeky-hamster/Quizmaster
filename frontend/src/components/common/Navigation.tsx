import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navigation: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to set animation delay for nav items
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      (link as HTMLElement).style.setProperty('--i', index.toString());
    });
  }, []);

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <Navbar expand="lg" className="custom-navbar mb-4">
      <Container>
        <Navbar.Brand as={Link} to={isAdmin() ? '/admin' : '/dashboard'}>
          Quiz Master
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isAdmin() ? (
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/admin" 
                className={location.pathname === '/admin' ? 'active' : ''}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/admin/users" 
                className={location.pathname === '/admin/users' ? 'active' : ''}
              >
                Users
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/admin/subjects" 
                className={location.pathname === '/admin/subjects' ? 'active' : ''}
              >
                Subjects
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/admin/chapters" 
                className={location.pathname === '/admin/chapters' ? 'active' : ''}
              >
                Chapters
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/admin/quizzes" 
                className={location.pathname === '/admin/quizzes' ? 'active' : ''}
              >
                Quizzes
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/dashboard" 
                className={location.pathname === '/dashboard' ? 'active' : ''}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/quizzes" 
                className={location.pathname === '/quizzes' ? 'active' : ''}
              >
                Quizzes
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/profile" 
                className={location.pathname === '/profile' ? 'active' : ''}
              >
                Profile
              </Nav.Link>
            </Nav>
          )}
          <Nav>
            <Nav.Item className="welcome-text d-flex align-items-center">
              Welcome, {user.fullName}
            </Nav.Item>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation; 