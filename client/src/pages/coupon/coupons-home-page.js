//Author: Minal Rameshchandra Khona (B00873733)
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckboxesGroup from "./coupons-filter";
import PaginationRounded from "../../components/pagination/Pagination"
import Images from "../../assets";
import CouponDetails from "./coupons-details"
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { toast } from "react-toastify";
import { isUserLoggedIn } from '../../utils/firebase';
import AXIOS_CLIENT from "../../utils/apiClient";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'blue',
}));

export default function CouponsHomePage() {
  const [page, setPage] = useState(1);
  const [couponsList, setCouponsList] = useState([]);
  const [list, setList] = useState([]);

  const [admin, setAdmin] = useState(true);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(couponsList.length / itemsPerPage);

  const handleChange = (event, value) => {
    const start = (value - 1) * itemsPerPage;
    const end = (value) * itemsPerPage;
    setList(couponsList.slice(start, end));
    setPage(value);
  }

  useEffect(() => {
    AXIOS_CLIENT.get('/users').then((res) => {
      console.log('User', res);
      if (res.data.user_role === 1) {
        setAdmin(true)
      } else {
        setAdmin(false)
      }
    }).catch(err => {
      console.error(err);
      toast.error("Something went wrong!");
    });

    AXIOS_CLIENT.get('/coupons').then((res) => {
      const couponsList = res.data.coupons;
      setCouponsList(couponsList);
      setList(couponsList.slice(0, itemsPerPage));
    }).catch(err => {
      console.error(err);
      toast.error("Something went wrong!");
    });
  }, []);

  return (
    <Grid container sx={{ marginTop: '20px' }}>
      <Grid
        item xs={12} md={12}
        sx={{ display: 'flex', pb: 2, fontSize: '100px' }}
        style={{ width: '100%' }}
        justifyContent="center">

        {/*Display POST COUPON when ADMIN logs in and SAVED COUPONS when USER logs in*/}
        {
          isUserLoggedIn()
            ?
            admin
              ?
              <Button
                className="mx-auto bg-primary text-light w-100 mb-1"
                color="secondary"
                aria-label="add"
                component="a"
                href="/post-coupons"
              >
                Post Coupon
              </Button>
              :
              <Button
                className="mx-auto bg-primary text-light w-100 mb-1"
                color="secondary"
                aria-label="add"
                component="a"
                href="/saved-coupons"
              >
                Saved Coupons
              </Button>
            :
            <> </>
        }
      </Grid >

      <Grid item xs={12}>
        <Image src={Images.couponMain} className="center" width="100%" height="100%" />
      </Grid>

      {/* Filters Option*/}
      <Grid item xs={2} md={2} sx={{ display: { xs: 'none', md: 'flex' }, pt: 2 }}>
        <CheckboxesGroup />
      </Grid>

      {/* Coupons List*/}
      <Grid item xs={12} md={10} sx={{ pt: 2 }}>
        <Item>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Grid container spacing={3}>
              {list.map((item) => (
                <CouponDetails data={item} key={item._id} admin={admin}
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
            handleChange={handleChange} />
        </Grid>
      </Grid>
    </Grid >
  );
}