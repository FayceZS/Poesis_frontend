import React, { useEffect, useState } from 'react';
import AuthForm from './authForm';
import { Link } from 'react-router-dom';
import "./homePage.css";

const HomePage = ({ loggedIn }) => {
  const [showForm, setShowForm] = useState(!loggedIn);

  useEffect(() => {
    setShowForm(!loggedIn);
  }, [loggedIn]);

  return (
    <div id="homePage">
      <h1 id="homePageH1">Bienvenue sur Poesis !</h1>
      
      {showForm ? (
        <AuthForm  onLogin={loggedIn} />
      ) : (
        <Link to="/generate-poem">
          <button>Générer mes poèmes</button>
        </Link>
          )}
        <p>
       Découvrez des poèmes sur mesure, inspirés par les plus grands auteurs, créés en un clin d'œil grâce à notre application innovante.
      </p>
    </div>
  );
};

export default HomePage;
