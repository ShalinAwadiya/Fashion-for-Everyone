//Author: Minal Rameshchandra Khona (B00873733)
import { Button, Grid, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Cancel } from '@mui/icons-material';
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from 'react-toastify';

const CouponDetails = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const item = props.data;
    const isAdmin = props.admin;

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

    return (
        <Grid item xs={12} sm={6} md={4} >
            <img
                width="100%"
                src={item.image}
                srcSet={item.image}
                loading="lazy"
                onClick={handleOpen}
            />

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
                        <Button >
                            <BookmarkAddIcon />
                        </Button>
                        <Button onClick={handleClose}>
                            <Cancel />
                        </Button>
                        <Button>
                            <AddShoppingCartIcon />
                        </Button>
                    </div>
                </Box>
            </Modal>

            <Typography
                component={'div'}
                variant="body1"
                width="100%"
                color='black'
                bottom="0px"
                textAlign="left"
                fontWeight="bold">
                {item.code}
            </Typography>

            <Typography
                variant="body1"
                textAlign="left"
                color='black'>
                {item.expiryDate}
                <br />
                {item.message}
            </Typography>

            {
                isAdmin &&
                <Button
                    variant='contained'
                    component="a"
                    href="/coupons"
                    onClick={() => handleDelete(item)}
                    sx={{ display: 'flex', marginTop: '10px' }}>
                    DELETE COUPON
                </Button>
            }
        </Grid >);
};
export default CouponDetails;

