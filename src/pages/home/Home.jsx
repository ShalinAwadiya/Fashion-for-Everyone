import React from 'react';
import './HomeStyles.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import KidImage from '../../assets/images/home-kid.jpg';
import ManImage from '../../assets/images/home-man.jpg';
import WomanImage from '../../assets/images/home-woman.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const themeTypography = createTheme();

themeTypography.typography.h3 = {
  fontSize: '1.2rem',
  fontFamily: 'Raleway',
  '@media (min-width:300px)': {
    fontSize: '1.5rem',
  },
  [themeTypography.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};
function Item(props) {
  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', md: 'column' },
          alignItems: 'center',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: 1,
          fontWeight: 'bold',
        }}
      >
        <Link to={{ pathname: 'collection' + props.item.route }}>
          <Box
            component="img"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 700,
              width: 1080,
              minWidth: { md: 350 },

              maxHeight: { xs: 700, md: 700 },
              maxWidth: { xs: 1080, md: 1080 },
            }}
            alt={props.item.description}
            src={props.item.image}
          />
        </Link>
        <ThemeProvider theme={themeTypography}>
          <Typography variant="h3">{props.item.name}</Typography>
        </ThemeProvider>
      </Box>
    </Paper>
  );
}

function Slides(props) {
  var items = [
    {
      name: 'KID',
      description: 'KID CLOTHS COLLECTION',
      image: KidImage,
      route: '/kid/',
    },
    {
      name: 'MAN',
      description: 'MAN CLOTHS COLLECTION',
      image: ManImage,
      route: '/man/',
    },
    {
      name: 'WOMAN',
      description: 'WOMAN CLOTHS COLLECTION',
      image: WomanImage,
      route: '/woman/',
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
function Home() {
  return (
    <div className="slides">
      <Slides />
    </div>
  );
}

export default Home;
