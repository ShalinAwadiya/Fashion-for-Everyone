import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";
import Button from '@mui/material/Button';
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AddressForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.totalAmount)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (firstName && lastName && address1 && address2 && city && state && zip && country) {
      navigate('/payment',{state:{firstName :firstName,lastName:lastName,address1 : address1,address2 : address2,city : city,state : state,zip : zip,country : country, totalAmount:location.state.totalAmount, item : location.state.item}})
   }else {
     toast.error("Please fill all the fields")
  }
  }


  return (
      <React.Fragment>
        <br />
        <br />

          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <ToastContainer />
          <form onSubmit ={handleSubmit}>
          <Grid container spacing={24} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="fname"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="lname"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="billing address-line1"
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="billing address-line2"
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="billing address-level2"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="billing postal-code"
                  onChange={(e) => setZip(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="billing country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="secondary" name="saveAddress" value="yes" />
                  }
                  label="Use this address for payment details"
                />
              </Grid>
                <Button
                  onClick = {handleSubmit}
                  type="submit"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  >
                    Next
                  </Button>
          </Grid>
        </form>
      </React.Fragment>
    
  );
}


export default AddressForm;
