import React, { useContext } from 'react';
import AuthForm from './authForm';
import PoemForm from './form.js';
import "./homePage.css";
import { AuthContext } from '../AuthContext';

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div id="homePage">
      {/* <h1 id="homePageH1">Poesis</h1> */}
      
      {isLoggedIn ? (
        <PoemForm />
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default HomePage;
