import React, { useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../common/Navbar.css';

const AdminNavbar: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to set animation delay for nav items
  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      (link as HTMLElement).style.setProperty('--i', index.toString());
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Check if path is active - improved detection
  const isActive = (path: string) => {
    // Special case for dashboard
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    
    // For all other routes, check if the current path starts with the provided path
    // But ensure we match segment boundaries to avoid partial matches
    const currentPath = location.pathname;
    const exactMatch = currentPath === path || currentPath === `${path}/`;
    const nestedMatch = currentPath.startsWith(`${path}/`);
    
    return exactMatch || nestedMatch;
  };

  return (
    <Navbar expand="lg" className="custom-navbar mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/admin">Quiz Master Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/admin" 
              className={isActive('/admin') ? 'active' : ''}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/users" 
              className={isActive('/admin/users') ? 'active' : ''}
            >
              Users
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/subjects" 
              className={isActive('/admin/subjects') ? 'active' : ''}
            >
              Subjects
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/chapters" 
              className={isActive('/admin/chapters') ? 'active' : ''}
            >
              Chapters
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/quizzes" 
              className={isActive('/admin/quizzes') ? 'active' : ''}
            >
              Quizzes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/scores" 
              className={isActive('/admin/scores') ? 'active' : ''}
            >
              Scores
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item className="welcome-text d-flex align-items-center">
              Welcome, {user?.fullName}
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

export default AdminNavbar; 