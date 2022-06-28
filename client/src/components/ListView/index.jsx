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

function ItemView({ item: { name, brand, price, review, link } }) {
  return (
    <div className="grid-item">
      <img src={link} alt="" />
      <div>
        <header>
          <h5>{name}</h5>
          <span>🌟{review}</span>
        </header>
      </div>
      <div className="info">
        <p className="brand">
          <b>{brand}</b>
          <b>${price}</b>
        </p>
      </div>
    </div>
  );
}
function Item2View({ item: { name, brand, price, review, link } }) {
  return (
    <div className="grid-item">
      <Card>
        <CardBody>
          <Link to={{ pathname: `/product/` }}>
            <CardTitle>
              <b>{name}</b>
            </CardTitle>

            <img className="img-thumbnail" src={link} alt={name} />
          </Link>
          <p>
            {' '}
            <span>🌟{review}</span>
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
