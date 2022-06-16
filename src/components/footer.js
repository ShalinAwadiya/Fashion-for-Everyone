import { Container, Grid, Box, Link, Avatar } from '@material-ui/core';

function Footer() {
  return (
    <Box px={{ xs: 3, sm: 8 }} py={{ xs: 3, sm: 8 }} className="mt-5 bg-light">
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={2}>Get to Know Us</Box>
            <Box>
              <Link href="/" color="inherit">
                {' '}
                About Company
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                {' '}
                Culture
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}> Make Money with Us </Box>
            <Box>
              <Link href="/" color="inherit">
                {' '}
                sell on Fashion World
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                {' '}
                Publish With Us
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help </Box>
            <Box>
              <Link href="/" color="inherit">
                {' '}
                Complain
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                {' '}
                Manage your Account
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;