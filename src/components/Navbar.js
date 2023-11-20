import React from 'react';
import { UserAuth } from '../context/AuthContext';
import { Navbar, Container, Nav, Button, Image } from 'react-bootstrap';


const Navigation = () => {

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('The user has logged out')
      alert("You signed out. Come back soon!")
    } catch (e) {
      console.log(e.message);
    }
  };
  

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
         <Navbar.Brand href="/library"><Image src="/booklightsmall.ico" alt="Booklight logo" /></Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user ? (<Nav.Link href="/library">HOME COLLECTION</Nav.Link>):(<Nav.Link href="*"> </Nav.Link>)}
            {user ? (<Nav.Link href="/addbook">ADD</Nav.Link>):(<Nav.Link href="*"> </Nav.Link>)}
          </Nav>
          <Nav>
            {user ? (<Nav.Link href="/account">{user && user.email}</Nav.Link>):(<Nav.Link href="*"> </Nav.Link>)}
            {user ? (<Button onClick={handleLogout}  variant="outline-warning" size='sm' type="submit">SIGN OUT</Button>):(<Nav.Link href="/"> </Nav.Link>)}
          </Nav>
         </Navbar.Collapse>     
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation;