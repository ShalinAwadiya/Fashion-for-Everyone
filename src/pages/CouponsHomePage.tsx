import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CheckboxesGroup from "./Filter";
import PaginationRounded from "../components/pagination/Pagination"
import Images from "../assets";
import Navbar from "../components/navbar/Navbar";
import CouponsList from "./CouponsList"
import { couponsList } from '../data'
import { Box } from '@mui/material';
import React, { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'blue',
}));

export default function CouponsHomePage() {
  const [page, setPage] = useState(1);
  const [list, setList] = useState(couponsList.slice(0, 6));

  const itemsPerPage: number = 6;
  const totalPages: number = Math.ceil(couponsList.length / itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    const start: number = (value - 1) * itemsPerPage;
    const end: number = (value) * itemsPerPage;
    setList(couponsList.slice(start, end));
    setPage(value);
  }

  return (
    <Grid container>
      {/* Navigation Bar */}
      <Grid item xs={12} sx={{ display: 'flex' }}>
        <Navbar />
      </Grid>

      {/* Display Image */}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <img src={Images.couponMain} className="center" width="100%" height="100%" />
      </Grid>

      {/* Filters */}
      <Grid item xs={2} md={2.5} sx={{ display: { xs: 'none', md: 'flex' }, pl: 5 }}>
        <CheckboxesGroup />
      </Grid>

      {/* Display list of coupons */}
      <Grid item xs={12} md={9.5}>
        <Item>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Grid container spacing={3}>
              {list.map((item: any) => (
                <CouponsList data={item} key={item.id}
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
    </Grid>
  );
}