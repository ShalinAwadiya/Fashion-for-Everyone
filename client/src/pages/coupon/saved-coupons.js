//Author: Minal Rameshchandra Khona (B00873733)
import { Box, Button, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './styles.css'
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from "react-toastify";
import PaginationRounded from "../../components/pagination/Pagination";
import CouponDetails from "./coupons-details";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'blue',
}));

const SavedCoupon = () => {
    const [couponsList, setCouponsList] = useState([]);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        AXIOS_CLIENT.get('/users').then((res) => {
            if (res.data) {
                if (!localStorage.getItem('userId')) {
                    localStorage.setItem('userId', res.data.user.user_id);
                }
            }
        }).catch(err => {
            console.error(err);
            toast.error("Something went wrong!");
        });

        AXIOS_CLIENT.get('/coupons/saved/' + localStorage.getItem('userId')).then((res) => {
            if (res.data) {
                const coupons = res.data.coupons;
                setCouponsList(coupons);
                setList(coupons.slice(0, itemsPerPage));
                setLoading(false);
            }
        }).catch(err => {
            console.error(err);
            toast.error("Something went wrong!");
        });
    }, []);

    const unsaveCoupons = (item) => {
        const req = {
            couponCode: item.code
        }
        AXIOS_CLIENT.put('/coupons/unsave/' + localStorage.getItem('userId'), req)
            .then((res) => {
                if (res.status === 200) {
                    const coupons = res.data.coupons;
                    setCouponsList(coupons);
                    setList(coupons.slice(0, itemsPerPage));
                    console.log('Coupon unsaved successfully!!!')
                }
            }).catch(err => {
                console.error(err);
                toast.error("Something went wrong!");
            });
        navigate('/saved-coupons')
    }

    const itemsPerPage = 6;
    const totalPages = Math.ceil(couponsList.length / itemsPerPage);

    const handlePagination = (event, value) => {
        const start = (value - 1) * itemsPerPage;
        const end = (value) * itemsPerPage;
        setList(couponsList.slice(start, end));
        setPage(value);
    }

    return (
        <Grid container sx={{ display: 'flex', justifyContent: "center" }}>
            {loading ?
                <Box sx={{ display: 'flex', marginTop: '10px' }}>
                    <CircularProgress />
                </Box> :
                <Grid item xs={12} md={10} sx={{ pt: 2 }}>
                    {
                        couponsList.length != 0 ?
                            <>
                                <Typography
                                    variant="h6"
                                    textAlign='center'
                                    fontWeight={'bold'}>
                                    SAVED COUPONS
                                </Typography>
                                <hr />
                                <Item>
                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                        <Grid container spacing={3}>
                                            {list.map((item) => (
                                                <CouponDetails
                                                    data={item}
                                                    key={item._id}
                                                    userId={localStorage.getItem('userId')}
                                                    action="unsave"
                                                    unsave={unsaveCoupons}
                                                />
                                            ))}
                                        </Grid>
                                    </Box>
                                </Item>

                                {/* Pagination Bar */}
                                <Grid
                                    item xs={12} pt={1}
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                    style={{ width: '100%' }}
                                    justifyContent="center">
                                    <PaginationRounded
                                        data={couponsList}
                                        page={page}
                                        totalPages={totalPages}
                                        handleChange={handlePagination} />
                                </Grid>
                            </> : <>
                                <Container maxWidth="sm" margin="auto" >
                                    <Paper sx={{ p: 1.5, margin: 'auto', textAlign: 'center', height: '350px' }}>
                                        <Typography
                                            variant="body1">
                                            No saved coupons. You can visit
                                            <Button
                                                component='a'
                                                href='/coupons'>
                                                Coupons
                                            </Button>
                                            for viewing available coupons and saving them for further use.
                                        </Typography>
                                    </Paper>
                                </Container>
                            </>
                    }
                </Grid>
            }
        </Grid >
    )
};

export default SavedCoupon;