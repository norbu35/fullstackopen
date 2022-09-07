import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Navigation = () => {
  const loggedUser = useSelector(({ user }) => user);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav>
            <Nav.Link>
              <Link to="users">Users</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="blogs">Blogs</Link>
            </Nav.Link>
          </Nav>
          {loggedUser ? (
            <>
              <Navbar.Text>
                logged in as: {loggedUser.username}
                <Button
                  variant="primary"
                  onClick={handleLogout}
                  style={{ marginLeft: '1em' }}
                >
                  Logout
                </Button>
              </Navbar.Text>
            </>
          ) : null}
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
