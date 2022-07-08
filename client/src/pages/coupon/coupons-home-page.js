//Author: Minal Rameshchandra Khona (B00873733)
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckboxesGroup from "./coupons-filter";
import PaginationRounded from "../../components/pagination/Pagination"
import Images from "../../assets";
import CouponDetails from "./coupons-details"
import { Box, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { isUserLoggedIn } from '../../utils/firebase';
import AXIOS_CLIENT from "../../utils/apiClient";
import { useNavigate } from 'react-router-dom';

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
  const [allCoupons, setAllCoupons] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState();
  const [role, setRole] = useState(0);

  useEffect(() => {
    AXIOS_CLIENT.get('/users').then((res) => {
      if (res) {
        console.log({ res })
        setUser(res.data)
        setRole(res.data.user_role)
        if (!localStorage.getItem('userId')) {
          localStorage.setItem('userId', res.data.user.user_id);
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
    }).catch(err => {
      console.error(err);
      toast.error("Something went wrong!");
    });
  }, []);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(couponsList.length / itemsPerPage);

  const handlePagination = (event, value) => {
    const start = (value - 1) * itemsPerPage;
    const end = (value) * itemsPerPage;
    setList(couponsList.slice(start, end));
    setPage(value);
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

  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate('/show_products')
  }

  const handleClearFilterClick = () => {
    setCouponsList(allCoupons);
    setList(allCoupons.slice(0, itemsPerPage));
  }

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
            role === 1
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
        <img
          src={Images.couponMain}
          className="center"
          width="100%"
          height="100%"
          onClick={handleImageClick} />
      </Grid>

      {/* Filters Option*/}
      <Grid item xs={2} md={2} sx={{ display: { xs: 'none', md: 'flex' }, pt: 2, pr: 2 }}>
        <Stack flex-direction={'column'} spacing={2}>
          <CheckboxesGroup handleRadioChange={filterCoupons} />
          <Button
            variant="contained"
            onClick={handleClearFilterClick}>
            Clear Filter
          </Button>
        </Stack>
      </Grid>

      {/* Coupons List*/}
      <Grid item xs={12} md={10} sx={{ pt: 2 }}>
        <Item>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Grid container spacing={3}>
              {list.map((item) => (
                <CouponDetails
                  data={item}
                  key={item._id}
                  role={role}
                  userId={user.user.user_id}
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
    </Grid >
  );
}