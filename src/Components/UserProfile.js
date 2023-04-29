import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import "./userProfile.css";
import axios from 'axios';
const backendUrl = "https://pure-stream-14786.herokuapp.com";

const UserProfile = () => {
  const [email, setEmail] = useState('');
    const [password] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleAddressChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundImage(e.target.files[0]);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${backendUrl}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setEmail(response.data.email);
      setAddress(response.data.address);
    } catch (error) {
      console.error(error);
      // Gérer les erreurs ici
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", JSON.stringify(address));

    const response = await axios.put(
      `${backendUrl}/auth/profile`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (backgroundImage) {
      const imageFormData = new FormData();
      imageFormData.append('backgroundImage', backgroundImage);

      const imageResponse = await axios.post(
        `${backendUrl}/auth/profile/upload`,
        imageFormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(imageResponse.data);
    }

      console.log(response.data);
      setSuccessMessage('Profil mis à jour avec succès.');
  } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite lors de la mise à jour du profil."); // Ajoutez cette ligne
  }
};

  return (
    <Container id="userProfileContainer">
      <h1>Profil</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
         <Form.Group controlId="formStreet">
          <Form.Label>No et Rue:</Form.Label>
          <Form.Control type="text" value={address.street} onChange={(e) => handleAddressChange('street', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formCity">
          <Form.Label>Ville:</Form.Label>
          <Form.Control type="text" value={address.city} onChange={(e) => handleAddressChange('city', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formState">
          <Form.Label>Région:</Form.Label>
          <Form.Control type="text" value={address.state} onChange={(e) => handleAddressChange('state', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPostalCode">
          <Form.Label>Code postal:</Form.Label>
          <Form.Control type="text" value={address.postalCode} onChange={(e) => handleAddressChange('postalCode', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formCountry">
          <Form.Label>Pays:</Form.Label>
          <Form.Control type="text" value={address.country} onChange={(e) => handleAddressChange('country', e.target.value)} />
        </Form.Group>     
        <Form.Group controlId="formBackgroundImage">
          <Form.Label>Image de fond:</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
        </Form.Group>
              {/* Les autres champs du formulaire */}
              {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Ajoutez cette ligne */}
    {successMessage && <p className="success-message">{successMessage}</p>} {/* Ajoutez cette ligne */}
        <Button variant="primary" type="submit">
          Mettre à jour
        </Button>
      </Form>
    </Container>
  );
};

export default UserProfile;
