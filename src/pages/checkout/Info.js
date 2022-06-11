import React from 'react';
import Form from './Form';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css'

const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

export default function Info(props) {
  const [name, setName] = useState("");

  return (
    <main className="block2 col-2">
      <div className="row1">
        <img className="element" src="./images.png"></img>
        <img className="element" src="./index.png"></img>
      </div>
      {/* <CheckoutForm />
            <Elements stripe = {stripePromise}></Elements> */}

      <div className="row1">
        <Form className="form"></Form>
      </div>
    </main>
  );
};