import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch  } from 'react-router-dom'
import Register from '../Register/index'
import Login from '../Login/index'
import About from '../About/index'
import NewProjects from '../NewProjects/NewProject'
import Dashboard from '../Dashboard'
function NavBar() {
  
  

  return (
    <nav>
      <Router>
      
        <div className="App">
          <div className="text-center">
            
            <br />
            <Link to="/"> Home </Link>
            <br />
            <Link to="/register"> Register </Link>
            <br />
            <Link to="/login"> Login </Link>
            <br />
            <Link to="/about"> About </Link>
            <br />
            <Link to="/newprojects"> Start New Project </Link>
            <br />
            <Link to="/dashboard"> Dashboard </Link>
          </div>
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