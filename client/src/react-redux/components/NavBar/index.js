import React, { useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Register from '../Register/index'
import Login from '../Login/index'
import { Container, Nav, Navbar, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionLoggedOut } from '../User/actions'





function NavBar() {
  const { checked, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  //modal variables start
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  //modal variables end




  const handleLogout = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/logout')
      .then(res => res.json())
      .then(data => {
        dispatch(actionLoggedOut())
      })
  }

  return (
    
      
        <Navbar bg="light" expand="lg" className="mb-3">
          <Container>
            <a href="/homepage"><img src="/lamentidv3crop.png" height="50" className="d-inline-block align-top" alt="Lament.ID Logo" /></a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className="mx-3">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                {checked && user ? (
                  <>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/newprojects">Start New Project</Nav.Link>
                    <Nav.Link href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                  // <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Container>
                    <Button variant="link" onClick={handleShow} className="text-decoration-none text-secondary">
                      Login
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Title className="m-3">Enter Login Info</Modal.Title>
                      <Modal.Body><Login /></Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Button variant="link" onClick={handleShow2} className="text-decoration-none text-secondary">
                      Register
                    </Button>
                    <Modal show={show2} onHide={handleClose2}>
                      <Modal.Title className="m-3">Enter Registration Info</Modal.Title>
                      <Modal.Body><Register /></Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Container>
                )}



              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
  )
}

export default NavBar