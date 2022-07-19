import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from "react-toastify";


const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
});



function Review(props) {
  const { classes } = props;
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state.item)
  // AXIOS_CLIENT.post('/order/post_order', {products : location.state.item, total_amount : location.state.totalAmount, order_date : Date.now()})
  // .then((res) => {
  //   if (res.status === 201) {
  //     console.log('Subscriber saved successfully!!!')
  //   }
  // }).catch(err => {
  //   if (err.response.status === 409) {
  //     console.log('Error')
  //   } else {
  //     console.error(err);
  //     toast.error("Something went wrong!");
  //   }
  // });
  const addShippingInfo = () => {


    const user = {
      "userId": "requ",
      "address": {
        "firstName": location.state.firstName,
        "lastName": location.state.lastName,
        "address1": location.state.address1,
        "city": location.state.address1,
        "state": location.state.state,
        "zip": location.state.zip,
        "country": location.state.country
      }
    };


    AXIOS_CLIENT.post('/checkout', user)
      .then((res) => {
        if (res.status === 201) {
          console.log('Shipping Address saved successfully!!!')
        }
      }).catch(err => {
        if (err.response.status === 409) {
          console.log('Error')
        } else {
          console.error(err);
          toast.error("Something went wrong!");
        }
      });
    // const res = async () => {
    // console.log("Postingto OrderAPI")
    // await AXIOS_CLIENT.post('/order/post_order', {products : location.state.item, total_amount : location.state.totalAmount, order_date : Date.now()})
    // res()
    AXIOS_CLIENT.post('/order/post_order', { products: location.state.item, total_amount: location.state.totalAmount, order_date: Date.now() })
      .then((res) => {
        AXIOS_CLIENT.delete('/cart/remove_cart')
          .then((res) => {
            navigate('/orders')
          }).catch(err => {
            if (err.response.status === 409) {
              console.log('Error')
            } else {
              console.error(err);
              toast.error("Something went wrong!");
            }
          });
      }).catch(err => {
        if (err.response.status === 409) {
          console.log('Error')
        } else {
          console.error(err);
          toast.error("Something went wrong!");
        }
      });
  }


  return (
    <React.Fragment>
      <br />
      <br />
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem className={classes.listItem}>
          <hr />
          <ListItemText primary="Total" />
          <Typography>${location.state.totalAmount}</Typography>
        </ListItem>
        <hr />
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{location.state.firstName}{location.state.lastName}</Typography>
          <Typography gutterBottom>{location.state.address1}{location.state.address2}</Typography>
          <Typography gutterBottom>{location.state.city}{location.state.country}{location.state.zip}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment key="Name">
              <Grid item xs={6}>
                <Typography gutterBottom>Card Holder Name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{location.state.cardName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Card Number</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{location.state.cardNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Expiry Date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{location.state.expDate}</Typography>
              </Grid>
            </React.Fragment>
            <br />
            <br />
            <br />

          </Grid>
        </Grid>

        <Button
          onClick={addShippingInfo}
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
        >
          Place Order
        </Button>
      </Grid>
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);
