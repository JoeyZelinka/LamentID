import "./index.css";
import NavBar from '../NavBar/index'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import HomePage from "../HomePage/index"
import Register from '../Register/index'
import Login from '../Login/index'
import About from '../About/index'
import NewProjects from '../NewProjects/NewProject'
import Dashboard from '../Dashboard/index'
import ProtectedRoute from "../ProtectedRoute/index"




import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actionLoggedIn, actionLoggedOut } from "../User/actions";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/v1/users/current')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch(actionLoggedIn(data))
        } else {
          dispatch(actionLoggedOut())
        }
      })
  }, [dispatch])


  return (
    <div>
      <Router>
      <NavBar/>
      <div className="App">
          <Switch>
          <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <ProtectedRoute path="/newprojects">
              <NewProjects />
            </ProtectedRoute>
            <ProtectedRoute path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    
      </div>
  );
}

export default App;
