import React, { useState } from 'react';

import { data } from '../../data/data';
import './styleCollection.css';

import { Grid, Container } from '@material-ui/core';

import { useParams } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Card, CardBody, CardTitle, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const themeTypography = createTheme();

themeTypography.typography.h3 = {
  fontSize: '1.5rem',
  fontFamily: 'Arial',
  '@media (min-width:300px)': {
    fontSize: '1.5rem',
  },
  [themeTypography.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

function Item({ item: { name, price, link } }) {
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
            <b>Price: {price}$</b>
          </p>
        </CardBody>
        <CardFooter className="text-muted"></CardFooter>
      </Card>
    </div>
  );
}

function Slides() {
  const [items] = useState(data);

  return (
    <Container>
      <Grid container spacing={7}>
        {items.map((element, i) =>
          i < 5 ? (
            <Grid key={element.id} item>
              <Item key={element.id} item={element} />
            </Grid>
          ) : null
        )}
      </Grid>
    </Container>
  );
}
function Slides2() {
  const [items] = useState(data);

  return (
    <Container>
      <Grid container spacing={7}>
        {items.map((element, i) =>
          i > 4 ? (
            <Grid key={element.id} item>
              <Item key={element.id} item={element} />
            </Grid>
          ) : null
        )}
      </Grid>
    </Container>
  );
}

function Tabs() {
  let params = useParams();

  return (
    <div className="collection">
      <div className="col1">
        <ThemeProvider theme={themeTypography}>
          <Typography variant="h3">
            <strong>{capFirst(params.collection)} Collection</strong>
          </Typography>
        </ThemeProvider>
      </div>
      <div className="slides">
        <Slides />
      </div>
      <div className="col1">
        <ThemeProvider theme={themeTypography}>
          <Typography variant="h3">
            <strong>New Arrivals</strong>
          </Typography>
        </ThemeProvider>
      </div>
      <div className="slides">
        <Slides2 />
      </div>
    </div>
  );
}

function Collection() {
  return (
    <div className="slides">
      <Tabs />
    </div>
  );
}

export default Collection;
