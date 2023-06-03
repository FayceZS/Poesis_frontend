import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios"; // Assurez-vous d'importer axios

import CheckoutForm from "./checkoutForm";
import "./PaymentForm.css";
const backendUrl = "https://pure-stream-14786.herokuapp.com";
const stripePromise = loadStripe("pk_test_51NCK5EI5Y6tAVlOTuMEcXyt0c2W3ukWUo4B4kQmVoVRxavsxilpgKGhl6IPAdIe24VfrkWlWimjzpSoi7fN00SR000MB0eRjZY");

export default function PaymentModule({ credits, amount,fetchCredits }) {
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState(null); // Ajout de l'état de l'utilisateur
  const token = localStorage.getItem('authToken');

  // Ajout de l'effet pour obtenir l'utilisateur actuel
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    let isMounted = true;
    fetch(backendUrl + "/create-payment-intent", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credits: credits, amount: amount,userMail : localStorage.getItem('mail') }),
    })
    .then((res) => {
      if (!isMounted) return;
      return res.json();
    })
    .then((data) => {
      if (!isMounted) return;
      setClientSecret(data.clientSecret);
    });

    return () => {
      isMounted = false;
    };
  }, [credits, amount, token]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    clientSecret && (
      <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} options={options} credits={credits} amount={amount} onSuccess={fetchCredits} />
      </Elements>
    )
  );
}
