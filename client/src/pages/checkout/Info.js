import React from 'react';
import Form from './Form';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CardFront from '../../assets/images/card_front.png'
import CardBack from '../../assets/images/card_back.png'

// const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);

export default function Info(props) {
  const [name, setName] = useState("");

  return (
    <main className="col-md-8 mt-5">
      <div>
        <img className="m-4" src={CardFront}></img>
        <img className="m-4" src={CardBack}></img>
      </div>

      <div className="row1">
        <Form className="form"></Form>
      </div>
    </main>
  );
};