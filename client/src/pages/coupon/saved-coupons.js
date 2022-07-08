//Author: Minal Rameshchandra Khona (B00873733)
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './styles.css'
import AXIOS_CLIENT from "../../utils/apiClient";
import { toast } from "react-toastify";
import PaginationRounded from "../../components/pagination/Pagination";
import CouponDetails from "./coupons-details";
import { styled } from '@mui/material/styles';

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
    const itemsPerPage = 6;
    const totalPages = Math.ceil(couponsList.length / itemsPerPage);

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
                const couponsList = res.data.coupons;
                setCouponsList(couponsList);
                setList(couponsList.slice(0, itemsPerPage));
            }
        }).catch(err => {
            console.error(err);
            toast.error("Something went wrong!");
        });
    }, []);

    const handlePagination = (event, value) => {
        const start = (value - 1) * itemsPerPage;
        const end = (value) * itemsPerPage;
        setList(couponsList.slice(start, end));
        setPage(value);
    }

    return (
        <Grid container sx={{ display: 'flex', justifyContent: "center" }}>
            <Grid item xs={12} md={10} sx={{ pt: 2 }}>
                <Typography
                    variant="h6"
                    textAlign='center'>
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
            </Grid>
        </Grid>
    )
};

export default SavedCoupon;