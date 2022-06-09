import { Button, Grid, Modal, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Cancel } from '@mui/icons-material';

const CouponsList = (props: any) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const item = props.data;

    console.log(props.data)

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        p: 4,
    };

    return (
        <Grid item xs={6} sm={6} md={4} >
            <img
                width="100%"
                src={item.img}
                srcSet={item.img}
                loading="lazy"
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
                BackdropProps={{ sx: { opacity: '0.5' }, color: 'black'}}
            >
                <Box sx={style}>
                    <Typography
                        component={'div'}
                        sx={{ p: 2 }}>
                        The coupon can be used for {item.brand} until {item.expiry} to avail {item.discount} discount.
                    </Typography>
                    <div className="container" style={{ margin: 'auto', textAlign: 'center' }}>
                        <Button >
                            <BookmarkAddIcon />
                        </Button>
                        <Button>
                            <Cancel/>
                        </Button>
                        <Button>
                            <AddShoppingCartIcon/>
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
                fontWeight="bold"
            >
                {item.brand} <br />
                <Typography component={'div'} variant="body2">{item.discount}</Typography>
                <Typography component={'div'} variant="body2">{item.expiry}</Typography>
            </Typography>
        </Grid >);
};
export default CouponsList;

