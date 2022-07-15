//Author: Manan Amin (B00897712)

/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Grid, Container } from '@material-ui/core';
import './styles.css';
import { Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Item2View({ item: { name, brand, price, rating, imageUrl, id } }) {
  return (
    <div className="grid-item">
      <Card>
        <CardBody>
          <Link to={{ pathname: `/product/${id}` }}>
            <CardTitle>
              <b>{name}</b>
            </CardTitle>

            <img className="img-thumbnail" src={imageUrl} alt={name} />
          </Link>
          <p>
            {' '}
            <span>🌟{rating}</span>
          </p>
          Brand:{brand}
          <p>
            <b>Price: {price}$</b>
          </p>
        </CardBody>
        <CardFooter className="text-muted"></CardFooter>
      </Card>
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
              <Item2View key={element.id} item={element} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
