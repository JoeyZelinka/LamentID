import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch  } from 'react-router-dom'
import Register from '../Register/index'
import Login from '../Login/index'
import About from '../About/index'
import NewProjects from '../NewProjects/NewProject'
import Dashboard from '../Dashboard'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionLoggedOut } from '../User/actions'

function NavBar() {
  const { checked, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('/api/v1/users/logout')
      .then(res => res.json())
      .then(data => {
        dispatch(actionLoggedOut())
      })
  }

  return (
    <nav>
      <Router>
        <Navbar bg="light" expand="lg" className="mb-3">
          <Container>
            <img src="/lamentidv2crop.png" height="50" className="d-inline-block align-top" alt="Lament.ID Logo" />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                { checked && user ? (
                  <>
                  <Nav.Link as={Link} to="/newprojects">Start New Project</Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/logout" onClick={handleLogout}>Logout</Nav.Link>
                  </>
                ) : (
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                ) }
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="App">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/newprojects">
              <NewProjects />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
    </Router>
    </nav>
  )
}

export default NavBar