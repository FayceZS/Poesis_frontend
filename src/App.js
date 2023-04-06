import React, { useState } from 'react';
import './App.css';
import PoemForm from './Components/form.js';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import BootstrapSpinner from './Components/bootstrapSpinner';
import Navigation from './Components/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/footer';
import Login from './Components/login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          {/* <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="/"
            element={
              loggedIn ? <PoemForm /> : <Login/>
            }
          />
          <Route
            path="/generate-poem"
            element={
              loggedIn ? <PoemForm /> : <Login/>
            }
          />
          autres routes ici */}
          <Route
            path="/generate-poem"
            element={
             <PoemForm /> 
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
