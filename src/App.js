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
import NoteState from './context/notes/NoteState';
import { Alert } from './Components/Alert';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is amazing React course" />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

