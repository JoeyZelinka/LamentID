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


function App() {
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
