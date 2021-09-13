import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./index.css";
import Register from "../Register";
import { Container } from "react-bootstrap";
import NavBar from "../NavBar"
function App() {
  return (
    <Router>
      <Container>
        <div className="App">
          <NavBar/>
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
