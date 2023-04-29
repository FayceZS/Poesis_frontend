import React from 'react';
import logoPoesis from "../img/logoPoesis.png";
import iconLogout from "../img/iconLogout.png";
import ecrirePoem from "../img/ecrirePoem.png";
import iconProfil from "../img/iconProfil.png";
import "./Navigation.css";

const Navigation = ({ isUserLoggedIn, onLogout }) => {
  return (
    <>
      <header>
        
          <a href="/">
            <img src={logoPoesis} alt="logoPoesis"/>
          </a>
        

        {isUserLoggedIn && (
          <div>
            <a href="/user-profile">
              <img src={iconProfil} alt="icone profil" />
              Profil
            </a>
            <a href="/generate-poem">
              <img src={ecrirePoem} alt="ecrire un poème"/>
              Poème
            </a>
            <a onClick={onLogout} href="/">
              <img src={iconLogout} alt="deconnexion"/>
              Deconnexion
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;
