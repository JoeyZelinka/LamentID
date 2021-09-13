import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./index.css";
import { Container } from "react-bootstrap";
// components
import Register from "../Register";
import Login from "../Login"

function App() {
  return (
    <Router>
      <Container>
        <div className="App">
          <div className="text-center">
            Static NavBar:
            <br />
            <Link to="/"> Home </Link>
            <br />
            <Link to="/register"> Register </Link>
            <br />
            <Link to="/login"> Login </Link>
          </div>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
