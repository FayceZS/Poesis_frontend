import React, { useRef, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import smileyAmoureux from '../img/smileyAmoureux.png';
import './generatedPoem.css';
import axios from 'axios';
const backendUrl = "https://pure-stream-14786.herokuapp.com";

function GeneratedPoemTest({ poem, poemDisplay, setStep, resetStates }) {
  const poemRef = useRef();
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [padding, setPadding] = useState('20');
  const [fontColor, setFontColor] = useState('#222');
  const [fontWeight, setFontWeight] = useState('400');
  const [fontFamily, setFontFamily] = useState('Sacramento');
  const [fontSize, setFontSize] = useState('20');


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
  
  const style = {
  color: fontColor,
  fontWeight: fontWeight,
    fontSize: `${fontSize}px`,
  fontFamily: fontFamily
};


  useEffect(() => {
    fetchUserBackgroundImage();
  }, []);

  useEffect(() => {
  const poemLines = document.querySelectorAll('.poemLine');
  poemLines.forEach((line) => {
    Object.assign(line.style, style);
  });
}, [fontColor, fontWeight, fontFamily,fontSize]); 


  return (
    <>
      <div className="print-container">
        <Card className="generatedPoemContainer print-card">
          <Card.Header className="bravoText">
            Bravo ! voici votre chef d'oeuvre{' '}
            <img src={smileyAmoureux} id="imgBravo" alt="smiley coeur"/>
          </Card.Header>
          <div className="style-controls">
            <div>
              <label htmlFor="commonPadding">Padding : </label>
                          <input
                            id="commonPadding"
                            type="number"
                            value={padding}
                            onChange={(e) => setPadding(e.target.value)}
                          />
            </div>
            <div>
             <label htmlFor="fontSize">Taille  : </label>
            <input
              id="fontSizeSelector"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            /> 
            </div>

            <div>
              <label htmlFor="fontColor">Couleur : </label>
            <input
              id="fontColor"
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
            </div>
            <div>
              <label htmlFor="fontWeight">Gras : </label>
            <select
              id="fontWeight"
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
            >
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
            </select>
            </div>
            <div>
              <label htmlFor="fontFamily">Police : </label>
            <select
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="Lato">Lato</option>
              <option value="Sacramento">Sacramento</option>
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
            </div>
            
            
</div>
          <Card.Body id="generatedPoemContainer" className="print-content">
            <div
              className="print-content cardBackground"
              ref={poemRef}
              style={{ backgroundImage: `url(${backgroundImage})`,padding : `${padding}px` }}
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
