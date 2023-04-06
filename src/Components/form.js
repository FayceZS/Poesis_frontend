import React, { useState,useEffect } from "react";
import { Container, Form, Card, Button, Spinner } from "react-bootstrap";
import BootstrapSpinner from "./bootstrapSpinner";
// import GeneratedPoem from "./generatedPoem";
import GeneratedPoemTest from "./generatedPoemTest";
import axios from 'axios';
import genre from "../img/genre.png"
import carteMentale from "../img/carteMentale.png"
import petitCoeur from "../img/petitCoeur.png"
import mariage from "../img/mariage.png"
import birthday from "../img/birthday.png"
import amis from "../img/amis.png";
import baby from "../img/baby.png";
const backendUrl = "http://localhost:3001/generate-poem";

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const PoemForm = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [signature, setSignature] = useState("");
  const [occasion, setOccasion] = useState("");
  const [author, setAuthor] = useState("");
  const [poem, setPoem] = useState("");
  const [loadingPage, setloadingPage] = useState(false);

 useEffect(() => {
      console.log(loadingPage);
    }, [loadingPage]); 

  async function fetchPoem(prompt) {
    
    
  try {
    
    
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      // console.log(response);
      const data = await response.json();
      const generatedPoem = data.poem;
      // Utilisez ici generatedPoem comme vous le souhaitez
      const poemTextOnly = generatedPoem
        .replace(/<br\s*\/?>/gi, "\n") // Remplace les balises <br> par des sauts de ligne
        .replace(/<\/?[^>]+(>|$)/g, " "); // Supprime les autres balises HTML

      setPoem(poemTextOnly);
      setloadingPage(false);
      console.log(loadingPage);
    } else {
      console.error("Erreur lors de la récupération du poème");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du poème:", error);
  }
  
}

  const handleSubmit = (e) => {
    setloadingPage(true);
    
    e.preventDefault();
    
  // Traitez les données du formulaire ici
  const prompt = `Ecris mois un poème ${occasion} pour ${gender} qui s'appelle ${firstName} en t'inspirant de ${author}, ta réponse devra contenir uniquement le poème et rien d'autre, de plus le poème devra être mis en forme de façon HTML et le poème devra faire 10 lignes et il devra être en français.`;
   // Appeler fetchPoem avec le prompt construit
  fetchPoem(prompt);
  // Réinitialisez les états du formulaire
  resetStates();
};

  const resetStates = () => {
    setGender('');
    setFirstName('');
    setSignature('');
    setOccasion('');
    setAuthor('');
    setPoem('');
  // Réinitialisez ici les autres états
  // Exemple : setFirstName('');
  };
  
  const poemDisplay = (poem) => {
  const lines = poem.split('\n');
  const formattedLines = lines.map((line, index) => {
    if (index > 0 && index % 4 === 0) {
      return (
        <React.Fragment key={index}>
          <div style={{ marginTop: '1rem' }}>{line}</div>
        </React.Fragment>
      );
    } else {
      return (
        <div key={index}>
          {line}
        </div>
      );
    }
  });
  return formattedLines;
};

  // const setLoading = () => {
  //   if (step === 5 && poem.length === 0) {
  //     setIsLoading(true);
  //     console.log(isloading);
  //   } else {
  //     setIsLoading(false);
  //     console.log(isloading);
  //   }
  // }

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={step === 5 ? { display: "none" } : {}}>
        <Card>
          <Card.Body>
            {step === 1 && (
              
              <Form.Group className="formController show" controlId="gender" >
                <div className="formQuestion">
                  <Form.Label>
                    Le poème est pour un homme ou une femme ?
                    
                  </Form.Label>
                  <img src={genre} />
                </div>
               
                <div className="formCheckDiv">
                <Form.Check
                  type="radio"
                  id="option1" 
                  name="options"
                  label="Une femme"
                  onChange={(e) => setGender(e.target.value)}
                  value="une femme"
                />
                <Form.Check
                  type="radio"
                  id="option2"
                  name="options"
                  label="Un homme"
                  onChange={(e) => setGender(e.target.value)}
                  value="un homme"
                />
                </div>
              </Form.Group>
            )} 

            {step === 2 && (
              <Form.Group controlId="firstName" className="formController show">
                <div>
                <Form.Label >Quel est son prénom ?</Form.Label>
                <img src={carteMentale} id="prenomImg" />
                </div>
                <Form.Control
                  type="text"
                  placeholder="Entrez le prénom ici"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  id="prenomBox"
                />
                <div>
                <Form.Label >Par qui le poème doit-il être signé ?</Form.Label>
                
                </div>
                <Form.Control
                  type="text"
                  placeholder="Entrez le prénom ici"
                  onChange={(e) => setSignature(e.target.value)}
                  value={signature}
                  id="prenomBox"
                />
                
              </Form.Group>
              
            )}

            {step === 3 && (
              <Form.Group controlId="occasion" className="formController show">
                <Form.Label>
                  Quelle est l'occasion à utiliser pour ce poème ?
                </Form.Label>
                
              <div className="occasionChoix">
                <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="L'amour"
                onChange={(e) => setOccasion(e.target.value)}
                value="d'amour"
        />
        <img src={petitCoeur} id="petitCoeur"/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option2"
                name="options"
                label="Un mariage"
                onChange={(e) => setOccasion(e.target.value)}
                value="pour un mariage"
        />
        <img src={mariage}/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option3"
                name="options"
                label="un anniversaire"
                onChange={(e) => setOccasion(e.target.value)}
                value="d'anniversaire"
        />
        <img src={birthday}/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option4"
                name="options"
                label="Une amitié"
                onChange={(e) => setOccasion(e.target.value)}
                value="d'amitié"
        /> 
        <img src={amis}/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option5"
                name="options"
                label="Une naissance"
                onChange={(e) => setOccasion(e.target.value)}
                value="de naissance"
        />
        <img src={baby}/>
        </div>
              </Form.Group>
            )}

            {step === 4 && (
              <Form.Group controlId="author" className="formController show">
                <Form.Label>
                  De quel auteur doit-on s'inspirer pour ce poème ? 
                </Form.Label>
               
                  <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="William Shakespeare"
                onChange={(e) => setAuthor(e.target.value)}
                value="William Shakespeare"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Victor Hugo"
                onChange={(e) => setAuthor(e.target.value)}
                value="Victor Hugo"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Pierre de Ronsard"
                onChange={(e) => setAuthor(e.target.value)}
                value="Pierre de Ronsard"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Arthur Rimbaud"
                onChange={(e) => setAuthor(e.target.value)}
                value="Arthur Rimbaud"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Joachim Du Bellay"
                onChange={(e) => setAuthor(e.target.value)}
                value="Joachim Du Bellay"
        />
                
              </Form.Group>
            )}

            <div className="d-flex justify-content-between"
              style={step === 5 ? { display: "none" } : {}}>
              {step > 1 && (
                <Button variant="secondary" className="formButton" onClick={() => setStep(step - 1)}>
                  Précédent
                  
                </Button>
              )}

              {step <= 4 ? (
                <Button type="button" variant="secondary" className="formButton" onClick={() => setStep(step <= 4 ? step + 1 : 5)}>Suivant</Button>

              ) : (
                  <Button type="submit">Soumettre</Button>
                  
              )}
            </div>
          </Card.Body>
        </Card>
      </Form>
      {step === 5 && (
        <Card id="poem">
          {loadingPage ? <BootstrapSpinner /> :
          
            <GeneratedPoemTest
            poemDisplay={poemDisplay}  
            poem={poem}
            
            setStep={setStep}
            resetStates={resetStates}
          />

          }
  </Card>
)} 

    </Container>
    
  );
};

export default PoemForm;