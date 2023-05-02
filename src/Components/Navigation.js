import React from 'react';
import logoPoesis from "../img/logoPoesis.png";
import iconLogout from "../img/iconLogout.png";
import ecrirePoem from "../img/ecrirePoem.png";
import iconProfil from "../img/iconProfil.png";
import { Link } from 'react-router-dom';
import "./Navigation.css";

const Navigation = ({ isUserLoggedIn, onLogout }) => {
  return (
    <>
      <header>
        
          <Link to="/">
            <img src={logoPoesis} alt="logoPoesis"/>
          </Link>
        

        {isUserLoggedIn && (
          <div>
            <Link to="/user-profile">
              <img src={iconProfil} alt="icone profil" />
              Profil
            </Link>
            <Link to="/generate-poem">
              <img src={ecrirePoem} alt="ecrire un poème"/>
              Poème
            </Link>
            <Link onClick={onLogout} to="/">
              <img src={iconLogout} alt="deconnexion"/>
              Deconnexion
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;
