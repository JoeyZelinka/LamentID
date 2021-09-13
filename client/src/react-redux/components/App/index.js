import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./index.css";
import Register from "../Register";
import { Container } from "react-bootstrap";
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
          </div>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  );
}

export default App;
