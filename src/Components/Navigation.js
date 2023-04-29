import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
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
            <img src={logoPoesis} />
          </a>
        

        {isUserLoggedIn && (
          <div>
            <a href="/user-profile">
              <img src={iconProfil} />
              Profil
            </a>
            <a href="/generate-poem">
              <img src={ecrirePoem} />
              Poème
            </a>
            <a onClick={onLogout} href="/">
              <img src={iconLogout} />
              Deconnexion
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;
