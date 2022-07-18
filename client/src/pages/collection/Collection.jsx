import React, { useState, useEffect } from 'react';

import './styleCollection.css';
import algoliasearch from 'algoliasearch/lite';

import { Grid, Container } from '@material-ui/core';

import { useParams } from 'react-router';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const appId = 'FXM5Z7L8QK';
const apiKey = '8742666d8583123913b0ff879eb4d742';

const client = algoliasearch(appId, apiKey);
const index = client.initIndex('products');

const themeTypography = createTheme();

themeTypography.typography.overline = {
  fontSize: '2rem',
  fontFamily: 'optima',
  '@media (min-width:300px)': {
    fontSize: '1.5rem',
  },
  [themeTypography.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

function Item({ item: { name, brand, imageUrl, id } }) {
  return (
    <div className="grid-item">
      <Card>
        <CardBody>
          <Link to={{ pathname: `/product/${id}` }}>
            <img className="img-thumbnail-1" src={imageUrl} alt={name} />
          </Link>
          <div className="text-muted">{brand}</div>
        </CardBody>
      </Card>
    </div>
  );
}

function Slides({ query }) {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let searchQuery = query;
    if (searchQuery === 'men') {
      searchQuery = '2';
    } else if (searchQuery === 'women') {
      searchQuery = 0;
    } else if (searchQuery === 'kid') {
      searchQuery = '1';
    } else {
      searchQuery = '';
    }
    index
      .search('', {
        filters: `category:${searchQuery}`,
        hitsPerPage: 8,
      })
      .then(({ hits }) => {
        setItems(hits);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={7}>
        {items &&
          items.map((element, i) =>
            i < 4 ? (
              <Grid key={element.id} item>
                <Item key={element.id} item={element} />
              </Grid>
            ) : null
          )}
      </Grid>
    </Container>
  );
}
function Slides2({ query }) {
  const [items, setItems] = useState();
  useEffect(() => {
    let searchQuery = query;
    if (searchQuery === 'men') {
      searchQuery = '2';
    } else if (searchQuery === 'women') {
      searchQuery = 0;
    } else if (searchQuery === 'kid') {
      searchQuery = '1';
    } else {
      searchQuery = '';
    }
    index
      .search('', {
        filters: `category:${searchQuery}`,
        hitsPerPage: 8,
      })
      .then(({ hits }) => {
        setItems(hits);
      });
  }, []);

  return (
    <Container>
      <Grid container spacing={7}>
        {items &&
          items.map((element, i) =>
            i > 3 ? (
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
          <Typography variant="overline" display="block">
            <strong>{params.collection.toUpperCase() + "'s CLOTHING"}</strong>
          </Typography>
        </ThemeProvider>
      </div>
      <div className="slides">
        <Slides query={params.collection} />
      </div>
      <div className="col1-col">
        <ThemeProvider theme={themeTypography}>
          <Typography variant="overline" display="block">
            <strong>New Arrivals</strong>
          </Typography>
        </ThemeProvider>
      </div>
      <div className="slides">
        <Slides2 query={params.collection} />
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
