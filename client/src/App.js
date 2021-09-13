import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/register">
          <Register />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
