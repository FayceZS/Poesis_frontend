import React, { useContext } from 'react';
import './App.css';
import PoemForm from './Components/form.js';
import Navigation from './Components/Navigation';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'animate.css';
import Footer from './Components/footer';
import AuthForm from './Components/authForm';
import UserProfile from './Components/UserProfile';
import HomePage from './Components/home';
import { AuthContext } from './AuthContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/generate-poem"
            render={() => (isLoggedIn ? <PoemForm /> : <AuthForm />)}
          />
          <Route
            path="/user-profile"
            render={() => (isLoggedIn ? <UserProfile /> : <AuthForm />)}
          />
        </Switch>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
