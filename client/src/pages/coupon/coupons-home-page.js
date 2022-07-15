//Author: Minal Rameshchandra Khona (B00873733)
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Paper, Snackbar, Box, Button, Stack, styled, CircularProgress } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { toast } from "react-toastify";
import Images from "../../assets";
import PaginationRounded from "../../components/pagination/Pagination"
import CouponsFilter from "./coupons-filter";
import CouponDetails from "./coupons-details"
import { isUserLoggedIn } from '../../utils/firebase';
import AXIOS_CLIENT from "../../utils/apiClient";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'blue',
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CouponsHomePage() {
  const [page, setPage] = useState(1);
  const [couponsList, setCouponsList] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState();
  const [role, setRole] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [exists, setExists] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    AXIOS_CLIENT.get('/users').then((res) => {
      if (res) {
        setUser(res.data)
        setRole(res.data.user_role)
        if (!localStorage.getItem('userId')) {
          localStorage.setItem('userId', res.data.user_id);
        }
      }
    }).catch(err => {
      console.error(err);
      toast.error("Something went wrong!");
    });

    AXIOS_CLIENT.get('/coupons/').then((res) => {
      const couponsList = res.data.coupons;
      setAllCoupons(couponsList);
      setCouponsList(couponsList);
      setList(couponsList.slice(0, itemsPerPage));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      toast.error("Something went wrong!");
    });
  }, []);

  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/show_products')
  }

  const filterCoupons = (event, value, min, max) => {
    if (event) {
      let url = '/coupons/filter?'
      let condition = [];
      if (value) {
        condition.push('discount=' + value)
      }
      if (min) {
        condition.push('minCartPrice=' + min)
      }
      if (max) {
        condition.push('maxCartPrice=' + max)
      }

      for (let i = 0; i < condition.length; i++) {
        url = url.concat(condition[i]);
        if (i != condition.length - 1) {
          url = url.concat('&')
        }
      }
      console.log({ url })

      AXIOS_CLIENT.get(url).then((res) => {
        const couponsList = res.data.coupons;
        setCouponsList(couponsList);
        setList(couponsList.slice(0, itemsPerPage));
      }).catch(err => {
        console.error(err);
        toast.error("Something went wrong!");
      });
    }
  }

  const handleClearFilterClick = () => {
    setCouponsList(allCoupons);
    setList(allCoupons.slice(0, itemsPerPage));
  }

  const saveCoupons = (item) => {
    const req = {
      userId: localStorage.getItem('userId'),
      coupon: {
        code: item.code,
        discount: item.discount,
        minCartPrice: item.minCartPrice,
        expiryDate: item.expiryDate,
        message: item.message,
        image: item.image
      }
    }

    console.log(req);

    AXIOS_CLIENT.post('/coupons/save-coupon', req)
      .then((res) => {
        if (res.status === 200) {
          setSaved(true);
          console.log('Coupon saved successfully!!!')
        }
      }).catch(err => {
        if (err.response.status === 409) {
          setExists(true);
          console.log('Coupon already saved!!!')
        } else {
          console.error(err);
          toast.error("Something went wrong!");
        }
      });
  }

  const itemsPerPage = 6;
  const totalPages = Math.ceil(couponsList.length / itemsPerPage);

  const handlePagination = (event, value) => {
    const start = (value - 1) * itemsPerPage;
    const end = (value) * itemsPerPage;
    setList(couponsList.slice(start, end));
    setPage(value);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaved(false);
    setExists(false);
  };

  return (
    <Grid container sx={{ marginTop: '20px' }}>
      <Grid
        item xs={12} md={12}
        sx={{ display: 'flex', pb: 2, fontSize: '100px' }}
        style={{ width: '100%' }}
        justifyContent="center">

        {/*Display POST COUPON when ADMIN logs in and SAVED COUPONS when USER logs in*/}
        {
          isUserLoggedIn() &&
            role === 1 ?
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
        }
      </Grid >

      <Grid item xs={12}>
        <img
          src={Images.couponMain}
          className="center"
          width="100%"
          height="100%"
          onClick={handleImageClick} />
      </Grid>

      {/* Filters Option*/}
      <Grid item xs={2} md={2} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, pt: 1, pr: 2 }}>
        <Stack flex-direction={'column'} spacing={2}>
          <CouponsFilter handleRadioChange={filterCoupons} />
          <Button
            variant="contained"
            onClick={handleClearFilterClick}>
            Clear Filter
          </Button>
        </Stack>
      </Grid>

      {/* Coupons List*/}
      <Grid item xs={12} md={10} sx={{ pt: 2 }}>
        {loading ?
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
            <CircularProgress />
          </Box> :
          <>
            <Item>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Grid container spacing={3}>
                  {list.map((item) => (
                    <CouponDetails
                      data={item}
                      key={item._id}
                      role={role}
                      userId={user.user_id}
                      action="save"
                      save={saveCoupons}
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

            <Snackbar open={saved} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '300px' }}>
                Coupon saved successfully!!!
              </Alert>
            </Snackbar>

            <Snackbar open={exists} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '300px' }}>
                Coupon is already saved!!!
              </Alert>
            </Snackbar>

            <Snackbar open={Boolean(state?.remove)} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="info" sx={{ width: '300px' }}>
                Coupon deleted successfully!!!
              </Alert>
            </Snackbar>
          </>
        }
      </Grid>
    </Grid >
  );
}