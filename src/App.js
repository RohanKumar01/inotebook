import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './Components/Navbar.js';
import { Home } from './Components/Home.js';
import About from './Components/About.js';

function App() {
  return (
    <>
      <Router>
        <Navbar /> 
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route> 
        </Switch>
      </Router>
    </>
  );
}

export default App;

