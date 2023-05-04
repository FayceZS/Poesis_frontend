import React, { useContext } from 'react';
import AuthForm from './authForm';
import PoemForm from './form.js';
import "./homePage.css";
import { AuthContext } from '../AuthContext';

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div id="homePage">
      {/* <h1 id="homePageH1">POESIS</h1>
      <p id="introText">Réaliser et imprimer un incroyable poème en quelques clics</p> */}
     <div class="overlay"></div>

      <h3 class="animate-charcter"> POESIS</h3>
      <p id="introText">Créer et imprimer un incroyable poème</p>
      
      {isLoggedIn ? (
        <PoemForm />
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default HomePage;
