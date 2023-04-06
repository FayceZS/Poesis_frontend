import React from 'react';
import { Container, Form, Card, Button, Spinner } from "react-bootstrap";
import smileyAmoureux from '../img/smileyAmoureux.png'


function GeneratedPoemTest({ poem,poemDisplay, setStep, resetStates }) {
  // Utilisez les fonctions passées en tant que props ici

  return (
    <>
      <Card.Header className="bravoText">Bravo ! voici votre chef d'oeuvre <img src={smileyAmoureux} id="imgBravo"/></Card.Header>
      <Card.Body className="generatedPoemContainer">
        <Card.Text id="generatedPoemContainer">{poemDisplay(poem)}</Card.Text>
         
        <div className="generatedPoemButtonsDiv">
         
        <Button type="button" onClick={() => {setStep(1);resetStates()}} className="generatedPoemButton">Recommencer</Button>
        <Button type="button" variant="success" onClick={() => setStep(1)} className="generatedPoemButton">Imprimer</Button>
        </div>
      </Card.Body>
    </>
  );
}

export default GeneratedPoemTest;
