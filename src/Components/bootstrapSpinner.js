
import { Button, Spinner,Container } from 'react-bootstrap';
import loadingPoem from "../img/loadingPoem.mp4";
import "./bootstrapSpinner.css";

function BootstrapSpinner() {
  return (
    <>
        <div className='loadingDiv'>
        <h3 id="loadingTitle" className='animate__animated animate__flipInY '>Votre poème est en cours d'écriture.....</h3>
       
            <video
              src={loadingPoem}
              alt="Connexion réussie"
              id="loadingPoem"
              className="w-100"
              autoPlay
              muted
              loop
            />
      
      </div>
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button> */}
    </>
  );
}

export default BootstrapSpinner;