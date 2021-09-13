import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register';
import './App.css';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Register/>
      <Dashboard/>
    </div>
  );
}

export default App;
