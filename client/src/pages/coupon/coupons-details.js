//Author: Minal Rameshchandra Khona (B00873733)
import { Button, Grid, Modal, Typography, Box, Stack, Snackbar } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Cancel } from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Paper } from '@material-ui/core';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CouponDetails = (props) => {
    const [open, setOpen] = useState(false);
    const [cart, setCart] = useState(false);
    const [expired, setExpired] = useState(false);

    const handleOpen = () => setOpen(true);

    const item = props.data;
    const role = props.role;
    const action = props.action;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
    };

    const handleDelete = (item) => {
        AXIOS_CLIENT.delete('/coupons/delete/' + item._id)
            .catch(err => {
                console.error(err);
                toast.error("Something went wrong!");
            });
    }

    const saveOrUnsaveCoupon = (item) => {
        console.log(item.code)
        if (action === 'save') {
            props.save(item);
        } else if (action === 'unsave') {
            props.unsave(item);
        }
    }

    const addToCart = (item) => {
        const req = {
            userId: localStorage.getItem('userId'),
            coupon: {
                code: item.code,
                minCartPrice: item.minCartPrice,
                discount: item.discount
            }
        }
        console.log(req);

        AXIOS_CLIENT.post('/coupons/add-cart', req)
            .then((res) => {
                if (res.status === 200) {
                    setCart(true);
                    console.log('Coupon added successfully!!!')
                }
            }).catch(err => {
                if (err.response.status === 400) {
                    setExpired(true);
                    console.log('Coupon has been expired!!!')
                } else {
                    console.error(err);
                    toast.error("Something went wrong!");
                }
            });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCart(false);
        setOpen(false);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 2 }}>
                <Grid item sx={{ display: { xs: 'none', md: 'flex', maxHeight: 200, minHeight: 200 } }}>
                    <img
                        width="100%"
                        src={item.image}
                        srcSet={item.image}
                        loading="lazy"
                        onClick={handleOpen}
                    />
                </Grid>

                <Grid item sx={{ display: { xs: 'none', sm: 'flex', md: 'none', maxHeight: 180, minHeight: 180 } }}>
                    <img
                        width="100%"
                        src={item.image}
                        srcSet={item.image}
                        loading="lazy"
                        onClick={handleOpen}
                    />
                </Grid>

                <Grid item sx={{ display: { xs: 'flex', sm: 'none', md: 'none' } }}>
                    <img
                        width="100%"
                        src={item.image}
                        srcSet={item.image}
                        loading="lazy"
                        onClick={handleOpen}
                    />
                </Grid>

                <Stack direction={'column'}>
                    <Typography
                        component={'div'}
                        variant="body1"
                        width="100%"
                        color='black'
                        textAlign="left"
                        fontWeight="bold"
                        marginLeft={1}>
                        {item.code}
                    </Typography>

                    <Typography
                        variant="body1"
                        textAlign="left"
                        color='black'
                        marginLeft={1}>
                        {item.expiryDate}
                        <br />
                        {item.message}
                    </Typography>

                    {/* Admin action - Delete Coupon */}
                    {
                        role === 1 ?
                            <Button
                                className="mx-auto bg-primary text-light w-100 mb-1"
                                color="secondary"
                                aria-label="add"
                                component="a"
                                href="/coupons"
                                onClick={() => handleDelete(item)}
                                sx={{ display: 'flex', marginTop: '10px' }}
                            >
                                DELETE COUPON
                            </Button>
                            :
                            <Stack direction={'row'} style={{ display: 'flex', justifyContent: 'center' }}>
                                {
                                    action === 'save' ?
                                        <Button >
                                            <BookmarkAddIcon onClick={() => saveOrUnsaveCoupon(item)} />
                                        </Button>
                                        :
                                        <Button >
                                            <BookmarkRemoveIcon onClick={() => saveOrUnsaveCoupon(item)} />
                                        </Button>
                                }
                                <Button>
                                    <AddShoppingCartIcon onClick={() => addToCart(item)} />
                                </Button>
                            </Stack>
                    }
                </Stack>

                {/* Coupon Image OnClick Modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    BackdropProps={{ sx: { opacity: '0.5' }, color: 'black' }}
                >
                    <Box sx={style}>
                        <Typography
                            component={'div'}
                            textAlign={'center'}
                            variant={'h6'}>
                            COUPON DETAILS
                        </Typography>

                        <Typography
                            component={'div'}
                            sx={{ p: 2 }}>
                            <table cellPadding={10}>
                                <th>
                                    <tr>Code</tr>
                                    <tr>Discount</tr>
                                    <tr>Validity</tr>
                                    <tr>Message</tr>
                                </th>
                                <td>
                                    <tr>{item.code}</tr>
                                    <tr>{item.discount}%</tr>
                                    <tr>{item.message}</tr>
                                    <tr>{item.expiryDate}</tr>
                                </td>
                            </table>
                        </Typography>

                        <div className="container" style={{ margin: 'auto', textAlign: 'center' }}>
                            <Button onClick={handleClose}>
                                <Cancel />
                            </Button>
                        </div>
                    </Box>
                </Modal>

                <Snackbar open={cart} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '300px' }}>
                        Added to cart successfully!!!
                    </Alert>
                </Snackbar>
            </Paper>
        </Grid >);
};
export default CouponDetails;