import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Card, Button, Spinner } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import smileyAmoureux from '../img/smileyAmoureux.png';
import './generatedPoem.css';
import axios from 'axios';
const backendUrl = "https://pure-stream-14786.herokuapp.com";

function GeneratedPoemTest({ poem, poemDisplay, setStep, resetStates }) {
  const poemRef = useRef();
  const [backgroundImage, setBackgroundImage] = useState(null);

const fetchUserBackgroundImage = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${backendUrl}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response.data);
    // const imageUrlWithoutUploads = response.data.backgroundImage;
    setBackgroundImage(`${response.data.backgroundImage}`); // Chargez l'image directement
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchUserBackgroundImage();
  }, []);

  return (
    <>
      <div className="print-container">
        <Card className="generatedPoemContainer print-card">
          <Card.Header className="bravoText">
            Bravo ! voici votre chef d'oeuvre{' '}
            <img src={smileyAmoureux} id="imgBravo" />
          </Card.Header>
          <Card.Body id="generatedPoemContainer" className="print-content">
            <div
              className="print-content cardBackground"
              ref={poemRef}
              style={{ backgroundImage: `url(${backgroundImage})` }}
            >
              
              {poemDisplay(poem)}
            </div>
        </Card.Body>
          <div className="generatedPoemButtonsDiv">
            <Button
              type="button"
              onClick={() => {
                setStep(1);
                resetStates();
              }}
              className="generatedPoemButton"
            >
              Recommencer
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button
                  type="button"
                  variant="success"
                  className="generatedPoemButton"
                >
                  Imprimer
                </Button>
              )}
              content={() => poemRef.current}
            />
          </div>
        </Card>
      </div>
    </>
  );
}

export default GeneratedPoemTest;
