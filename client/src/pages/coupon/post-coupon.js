//Author: Minal Rameshchandra Khona (B00873733)
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { DeleteRounded, ImageRounded } from "@mui/icons-material";
import './styles.css'
import MuiAlert from '@mui/material/Alert';
import { Container } from "@mui/system";
import AXIOS_CLIENT from "../../utils/apiClient";
import { Toast } from "reactstrap";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PostCoupon = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    //Image Upload
    const [image, setImage] = useState(null);
    const [base64, setBase64] = useState(null);

    //Error snackbar
    const [error, setError] = useState(false);

    const imageUpload = (e) => {
        if (e.target.files) {
            let reader = new FileReader();

            reader.readAsDataURL(e.target.files[0]);

            reader.onload = () => {
                setBase64(reader.result);
                setImage(reader.result);
            };
        }
    }

    const fileInput = useRef(null);
    const onImageChange = () => {
        if (fileInput.current != null) {
            fileInput.current.click();
        }
    }

    const onDeleteImage = () => {
        setImage(null);
        setBase64(null);
    }

    //Snackbar
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setError(false);
    };

    //Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log('Data received is: ', data);
        console.log('Image in Base64 is: ', base64);

        const req = {
            code: data.get('code'),
            discount: data.get('discount'),
            minCartPrice: data.get('minCartPrice'),
            expiryDate: data.get('expiryDate'),
            message: data.get('message'),
            image: base64
        }

        AXIOS_CLIENT.post('coupons/post-coupon', req)
            .then((res) => {
                console.log('Coupon response', res);
                if (res.status === 201) {
                    setOpen(true);
                    console.log('Coupon posted successfully!!!')
                    navigate("/coupons");
                }
            }).catch(err => {
                setError(true);
                console.error(err);
                Toast.error("Something went wrong!");
            });
    }

    return (
        <>
            <Container maxWidth="sm">
                <Paper sx={{ p: 1.5, my: 1, alignContents: 'center', justifyItems: 'center', }}>
                    <Stack direction="column" spacing={3}>
                        <Typography
                            variant="h6"
                            component="h6"
                            textAlign={'center'}
                            fontWeight={'bold'}>
                            ADD COUPONS
                        </Typography>

                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <TextField
                                fullWidth
                                label="Code"
                                name="code"
                                id="code"
                                required
                                sx={{ marginTop: 1, marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Discount"
                                name="discount"
                                id="discount"
                                sx={{ marginTop: 1, marginBottom: 2 }}
                            />
                            <TextField
                                fullWidth
                                required
                                type="number"
                                label="Price"
                                placeholder="Minimum purchase value"
                                name="minCartPrice"
                                id="price"
                                sx={{ marginTop: 1, marginBottom: 2 }}
                            />

                            <TextField
                                fullWidth
                                required
                                label="Message"
                                placeholder="Ex: Valid for orders above 50$"
                                name="message"
                                id="message"
                                multiline
                                sx={{ marginTop: 1, marginBottom: 2 }}
                            />

                            <Stack direction="row" spacing={1} sx={{ pb: 2 }}>
                                <Typography
                                    fontWeight={'bold'}>
                                    Expiry Date
                                </Typography>
                                <input
                                    type="date"
                                    required
                                    name="expiryDate"
                                    id="expiryDate" />
                            </Stack>

                            {/* Display selected Images if any*/}
                            {image != null &&
                                <Box className="img-list">
                                    <div className="img-container">
                                        <img
                                            className="img"
                                            src={image}
                                            width="200"
                                            height="200"
                                        />
                                        <IconButton
                                            sx={styling.btnDelete}
                                            onClick={() => onDeleteImage(image)}
                                        >
                                            <DeleteRounded />
                                        </IconButton>
                                    </div>
                                </Box>
                            }

                            <Stack direction="row" sx={styling.btnContainer}>
                                {/* Image upload */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    style={{ display: 'none' }}
                                    ref={fileInput}
                                    onChange={imageUpload}
                                />

                                <IconButton onClick={onImageChange}>
                                    <ImageRounded fontSize="medium" />
                                </IconButton>

                                <Box sx={{ m: 1, position: 'relative' }}>
                                    <Button
                                        variant="contained"
                                        type={"submit"}>
                                        SUBMIT
                                    </Button>
                                </Box>
                            </Stack>

                            <Snackbar open={state?.success} autoHideDuration={3000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Coupon posted successfully!!!
                                </Alert>
                            </Snackbar>

                            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    Error while posting coupon
                                </Alert>
                            </Snackbar>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
};

const styling = {
    btnDelete: {
        position: 'absolute',
        top: '2%',
        right: '2%',
        backgroundColor: 'lightgrey'
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
    },
    btnContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}
export default PostCoupon;