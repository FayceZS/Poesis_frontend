import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import PoemForm from './Components/form.js';
import { Container } from 'react-bootstrap';
import Navigation from './Components/Navigation';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'animate.css';
import Footer from './Components/footer';
import AuthForm from './Components/authForm';
import UserProfile from './Components/UserProfile';
import introPoesisVideo from "./img/Poesis.mp4";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('authToken') !== null);
  const [showImage, setShowImage] = useState(false);

  const handleUserLoggedIn = () => {
    setLoggedIn(true);
    setShowImage(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setLoggedIn(false);
  };

  useEffect(() => {
    if (showImage) {
      const timer = setTimeout(() => {
        setShowImage(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showImage]);

  return (
    <div className="App">
      <HashRouter>
        <Navigation isUserLoggedIn={loggedIn} onLogout={handleLogout} />
        {showImage ? (
          <Container>
            <video
              src={introPoesisVideo}
              alt="Connexion réussie"
              id="introPoesis"
              className="w-100"
              autoPlay
              muted
              loop
            />
          </Container>
        ) : (
          <Fragment>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  loggedIn && !showImage ? <PoemForm /> : <AuthForm onLogin={handleUserLoggedIn} />
                }
              />
              <Route
                path="/generate-poem"
                render={() =>
                  loggedIn && !showImage ? <PoemForm /> : <AuthForm onLogin={handleUserLoggedIn} />
                }
              />
              <Route
                path="/user-profile"
                render={() =>
                  loggedIn && !showImage ? (
                    <UserProfile />
                  ) : (
                    <AuthForm onLogin={handleUserLoggedIn} />
                  )
                }
              />
            </Switch>
          </Fragment>
        )}
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
