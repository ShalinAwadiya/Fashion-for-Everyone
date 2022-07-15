import React, { useContext, useState } from "react";
import { CartContext } from "./Cart";
import { AppBar, Avatar, Button, Card, CardActions, CardContent, Divider, Grid, IconButton, TextField, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles({
    root: {
        position: "sticky",
        top: "1%",
        minWidth: "80%",
        height: "60%",
        padding:"15px"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

const Context = () => {
    const classes = useStyles();

    const { item, totalItem, totalAmount, removeItem, increment, decrement } = useContext(CartContext)
    let price = totalAmount + 30;

    const [coupon,setCoupon]=useState('');
    const [formValid,setFormValid]=useState(false)

    const handleChange=(event)=>{
        if(event.target.value===""){
            setFormValid(false)
        }
        else{
            setFormValid(true)
        }
        setCoupon(event.target.value)
    }
    const handleSubmit=(event)=>{
        // event.preventDefault();
        toast("Coupon Applied!");
    }

    return (<>
        <Box sx={{flexGrow: 6 }}>
            <AppBar >
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon fontSize='normal' />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Shopping Cart
                    </Typography>
                    <Button variant="contained" startIcon={<ShoppingCartIcon fontSize="normal" />} color="primary" size="normal">
                        {totalItem}
                    </Button>
                    {/* <IconButton sx={{ p: 0 }} size="large" >
                        <ShoppingCartIcon fontSize="large" />
                        <Button> </Button>{totalItem}
                        </IconButton> */}

                    {/* <Button>{totalItem}</Button> */}

                </Toolbar>
            </AppBar>
        </Box>
        <Grid container spacing={0} sx={{ mt: 18, ml: 1 }}
            direction="row" justifyContent="center" alignItems="flex-start">
            <Grid container margin={"auto"} xs={12} sm={12} md={6} lg={6}
                direction="column" justifyContent="center" alignItems="flex-start">

                {item.map((curItem, index) => {
                    return (
                        <Grid container key={index}  sx={{ mb: 5, background: "background-paper", boxShadow: 3, padding:"10px" }}
                            direction="row" justifyContent="center" alignItems="flex-start">
                            <Grid item xs={4} md={4}>
                                <Avatar src={curItem.img} sx={{ height: "50%", width: "50%" }} />
                            </Grid>
                            <Grid container spacing={2} direction="column" md={7} justifyContent="center" alignItems="flex-start">
                                <Grid item sx={{ mt: 3 }}>
                                    <Typography variant="h6" component="div" justifyContent="center" marginLeft={3}>
                                        {curItem.title}
                                    </Typography>
                                    <Typography variant="subtitle1" component="div" marginLeft={3}>
                                        <b>Size:</b> {curItem.size}
                                    </Typography>
                                    <Typography variant="subtitle1" component="div" marginLeft={3}>

                                        <b>Price:</b> ${curItem.price}
                                    </Typography>
                                </Grid>
                                <Grid item sx={{ mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <IconButton onClick={() => decrement(curItem.id)} size='small'>
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
                                            // InputLabelProps={{
                                            //     shrink: true,
                                            // }}
                                            InputProps={{
                                                style: { fontSize: 12 },
                                                inputProps: { min: 1, max: 10 }
                                            }} />
                                        <IconButton onClick={() => increment(curItem.id)} size='small'>
                                            <AddCircleIcon />
                                        </IconButton>

                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item mt={2}>
                                <DeleteIcon onClick={() => removeItem(curItem.id)} fontSize="small" />
                            </Grid>


                            <Divider />


                        </Grid>
                    )
                })}
            </Grid>
            <Grid container  sx={{ mr: 5 }} xs={10} sm={5} md={5} lg={5}
                direction="row">

                <Card className={classes.root} elevation={8} sx={{ mb: 3 }}>
                <Typography variant="div" component="h3" ml={1}>
                            
                            Apply Coupon
                        </Typography>
                    <TextField
                        id="outlined-size-normal"
                        size="small"
                        sx={{ m: 1, minWidth: "95%" }}
                        InputProps={{
                            style: { fontSize: 12 },
                          
                        }}
                        value={coupon}
                        onChange={handleChange}
                    />                    
                    <Button variant="contained" sx={{ mb: 2, ml: 1 }} size="small" color="primary" disabled={!formValid} onClick={handleSubmit}>APPLY</Button>

                </Card>
                <Card className={classes.root} elevation={8}>

                    <CardContent>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                        >
                            Shopping Cart
                        </Typography>
                        <Typography variant="div" component="h3" >
                            {" "}
                            Order Summary
                        </Typography>
                        <Typography variant="subtitle2">
                            <hr />
                        </Typography>
                        <Grid container>
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                <Typography variant="body1" component="div">
                                    <b>
                                        Shipping
                                    </b>

                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}>
                                <Typography variant="body1" component="div">
                                    $30
                                </Typography>
                            </Grid>
                            <Grid item xs={11} sm={11} md={11} lg={11}>
                                <Typography variant="body1" component="div">
                                    <b>
                                        Total
                                    </b>

                                </Typography>
                            </Grid>
                            <Grid item xs={1} sm={1} md={2} lg={1} mr={-5}>

                                <Typography variant="body1" component="div">

                                    ${price}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button size="normal" color="primary" variant="outlined">
                            CHECKOUT ({totalItem})
                        </Button>
                    </CardActions>
                </Card>

            </Grid>
            <ToastContainer />
        </Grid>











    </>
    )
}
export default Context;