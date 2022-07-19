import React, { useContext, useState } from "react";
import { CartContext } from "./Cart";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/system";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "1%",
    minWidth: "90%",
    height: "60%",
    padding: "15px",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Context = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const {
    item,
    totalItem,
    totalAmount,
    removeItem,
    increment,
    decrement,
    coupon,
    removeCoupon,
  } = useContext(CartContext);



  let shipping = 30;
  let price = Math.max(totalAmount + shipping, 0);

  let discount = 0;
  if (price > 0 & coupon.code!=="-") {
    discount = (parseInt(coupon.discount) * parseInt(totalAmount)) / parseInt(100);
    price = price - discount;
  }

  if (totalAmount == 0) {
    shipping = 0;
    price = 0;
  }

  const navigateCheckout = () => {
    if (totalAmount <= 0) {
      toast("Please enter the products into cart before checking out!");
      navigate("/cart");
    } else if (totalAmount < coupon.minCartPrice) {
      toast("Can't apply this coupon !");
      navigate("/cart");
    } else {
      navigate("/checkout",{ state: { totalAmount: price, item: item }});
    }
  };

  return (
    <>
      <Grid
        container
        sx={{ mt: 10, pb: 20 }}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid
          container
          margin={"auto"}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          {item?.length === 0 ? (
            <div>
              <img src="https://alphapharmaexhibitions.com/images/cartempty1.png"></img>
            </div>
          ) : (
            <div>
              {item.map((curItem, index) => {
                return (
                  <Grid
                    container
                    key={index}
                    sx={{
                      mb: 5,
                      background: "background-paper",
                      boxShadow: 3,
                      padding: "10px",
                    }}
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <Grid item xs={10} md={4}>
                      <img src={curItem.imageUrl} height="50%" width="75%" />
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      direction="column"
                      xs={10}
                      md={7}
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Grid item sx={{ mt: 3 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          justifyContent="center"
                          marginLeft={3}
                        >
                          {curItem.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          component="div"
                          marginLeft={3}
                        >
                          <b>Price:</b> ${curItem.price}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ mb: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <IconButton
                            onClick={() => decrement(index)}
                            size="small"
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                          <TextField
                            size="small"
                            id="standard-number"
                            type="text"
                            label="Quantity"
                            variant="standard"
                            pattern="[0-9]"
                            value={curItem.quantity}
                            marginLeft={3}
                            InputProps={{
                              style: { fontSize: 12 },
                              inputProps: { min: 1, max: 10 },
                            }}
                          />
                          <IconButton
                            onClick={() => increment(index)}
                            size="small"
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item md={1} xs={2} mt={3}>
                      <DeleteIcon
                        onClick={() => removeItem(curItem.product_id)}
                        fontSize="small"
                      />
                    </Grid>
                    <Divider />
                  </Grid>
                );
              })}
            </div>
          )}
        </Grid>
        <Grid container xs={12} sm={12} md={5} lg={5} direction="row">
          <Card className={classes.root} elevation={8}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Shopping Cart
              </Typography>
              <Typography variant="div" component="h3">
                {" "}
                Order Summary
              </Typography>
              <Typography variant="subtitle2">
                <hr />
              </Typography>
              <Grid container>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  <Typography variant="body1" component="div">
                    <b>Coupon Code</b>
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <Typography variant="body1" component="div">
                    {coupon.code}
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  <Typography variant="body1" component="div">
                    <b>Discount</b>
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <Typography variant="body1" component="div">
                    ${discount}
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  <Typography variant="body1" component="div">
                    <b>Shipping</b>
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <Typography variant="body1" component="div">
                    ${shipping}
                  </Typography>
                </Grid>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                  <Typography variant="body1" component="div">
                    <b>Total</b>
                  </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={2} lg={1}>
                  <Typography variant="body1" component="div">
                    ${price}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                onClick={navigateCheckout}
                size="normal"
                color="primary"
                variant="outlined"
              >
                CHECKOUT ({totalItem})
              </Button>
              <Button
                onClick={() => removeCoupon()}
                size="normal"
                color="primary"
                variant="outlined"
              >
                Remove Coupon
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <ToastContainer />
      </Grid>
    </>
  );
};

export default Context;
