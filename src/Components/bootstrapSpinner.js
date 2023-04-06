import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function BootstrapSpinner() {
  return (
      <>
        <h3 id="loadingTitle">Le poème est en cours d'écriture.....</h3>
        <Button variant="primary" disabled>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            <span className="visually-hidden">Le poème est en cours d'écriture....</span>
        </Button>{' '}
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