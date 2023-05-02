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
      <p>
        L'application permettant de générer un poème personnalisé inspiré d'un grand auteur
        en un temps record.
      </p>
      {showForm ? (
        <AuthForm  onLogin={loggedIn} />
      ) : (
        <Link to="/generate-poem">
          <button>Générer mes poèmes</button>
        </Link>
      )}
    </div>
  );
};

export default HomePage;
