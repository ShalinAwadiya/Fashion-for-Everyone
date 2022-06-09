/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Grid, Container } from '@material-ui/core';

import './styles.css';

function ItemView({ item: { name, brand, price, review, link } }) {
  return (
    <div className="grid-item">
      <img src={link} alt="" />
      <header>
        <h4>{name}</h4>
        <span>🌟{review}</span>
      </header>
      <footer>
        <p>
          <b>{brand}</b>
        </p>
        <p>
          <b>${price}</b>
        </p>
      </footer>
    </div>
  );
}

export default function ListView({ items }) {
  return (
    <div className="new_grid">
      <Container>
        <Grid container spacing={7}>
          {items.map((element) => (
            <Grid key={element.id} item>
              <ItemView key={element.id} item={element} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
