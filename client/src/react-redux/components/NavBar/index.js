import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch  } from 'react-router-dom'
import Register from '../Register/index'
import Login from '../Login/index'
import About from '../About/index'
import NewProjects from '../NewProjects/NewProject'
function NavBar() {
  
  

  return (
    <nav>
      <Router>
      
        <div className="App">
          <div className="text-center">
            Static NavBar:
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
          </Switch>
        </div>
      
    </Router>

      
     
        
          
        
     
    </nav>
  )
}

export default NavBar