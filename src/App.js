import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About  from './components/About';

function App() {
  return ( 
    <>
    {/* <Navbar></Navbar>
    <h1>thid is inotebook</h1> */}
    <Router>
      <Navbar /> 
      <Routes>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About/>
        </Route> 
      </Routes>
    </Router>
  </>
);
}

export default App;
