import React from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Profile = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      className="formCardStyle"
    >
      <Grid
        direction="column"
        justifyContent="center"
        alignItems="center"
        md={3}
        lg={3}
        xs={10}
        sx={{
          mt: 5,
          mb: 60,
          backgroundColor: "background.paper",
          border: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mt: 2 }}>
          Profile
        </Typography>
        <Grid item sx={{ m: 2 }}>
          <TextField
            required
            label="FirstName"
            variant="outlined"
            name="firstname"
            value="John"
            aria-readonly
            fullWidth
          />
        </Grid>
        <Grid item lg={12} sx={{ m: 2 }}>
          <TextField
            required
            label="LastName"
            variant="outlined"
            name="lastname"
            value="Doe"
            aria-readonly
            fullWidth
          />
        </Grid>

        <Grid item sx={{ m: 2 }}>
          <TextField
            required
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            aria-readonly
            value="temporary@gmail.com"
          />
        </Grid>        
      </Grid>
    </Grid>
  );
};

export default Profile;
