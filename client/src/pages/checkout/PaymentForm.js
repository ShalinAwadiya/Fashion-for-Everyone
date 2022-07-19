import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const handleSubmit = (e) => {
  e.preventDefault()
}


function PaymentForm(props) {

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <form onSubmit ={handleSubmit}>
    <React.Fragment>
      <br />
      <br />
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth onChange={(e) => setCardName(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" fullWidth onChange={(e) => setCardNumber(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth onChange={(e) => setExpDate(e.target.value)}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        <Button
                onClick = {() => navigate('/review',{state:{cardName :cardName,cardNumber :cardNumber,expDate :expDate,firstName :location.state.firstName,lastName :location.state.lastName,address1 :location.state.address1,address2 : location.state.address2,city : location.state.city,state : location.state.state,zip : location.state.zip,country : location.state.country, totalAmount : location.state.totalAmount, item : location.state.item}})}
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
                >
                  Next
                </Button>
      </Grid>
    </React.Fragment>
    </form>
  );
}

export default PaymentForm;
