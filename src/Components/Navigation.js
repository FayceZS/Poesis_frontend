import React from 'react'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';  


const Navigation=()=>{
    return (
        <>
            <header>
                <h1 id='poesis'>Poesis</h1>
                 
                        <NavDropdown title="\/" id="basic-nav-dropdown">  
                            <NavDropdown.Item href="/">Accueil</NavDropdown.Item>  
                            <NavDropdown.Item href="/generate-poem">Générer un poème</NavDropdown.Item>  
                            <NavDropdown.Item href="/logoff">Se déconnecter</NavDropdown.Item>  
                            {/* <NavDropdown.Divider />  
                            <NavDropdown.Item href="#action/3.4">Another Item</NavDropdown.Item>   */}
                        </NavDropdown>  
                       
                    
            </header>
        </>
)
}

export default Navigation