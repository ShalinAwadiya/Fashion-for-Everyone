/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Link, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';

import './styles.css';

import SearchBar from '../../components/SearchBar';
import ListView from '../../components/ListView';
import FilterPanel from '../../components/FilterPanel';
import { data } from '../../data/data'

const links = [
  { name: 'Cart', href: '/' },
  { name: 'Profile', href: '/' },
];

export default function SeachPage() {
  const [brand, setBrand] = useState(null);
  const [review, setReview] = useState(null);
  const [price, setPrice] = useState([10, 500]);

  const [items, setItems] = useState(data);
  const [result, setResult] = useState(true);
  const [inputText, setSearch] = useState('');

  const handleReview = (event, value) => {
    !value ? null : setReview(value);
  };
  const handleBrand = (event, value) => {
    !value ? null : setBrand(value);
  };
  const handlePrice = (event, value) => {
    !value ? null : setPrice(value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const findResults = () => {
    let tempItems = data;

    if (review) {
      tempItems = tempItems.filter(
        (item) => parseInt(item.review, 10) === parseInt(review, 10)
      );
    }

    if (brand) {
      tempItems = tempItems.filter((item) => item.brand === brand);
    }

    if (inputText) {
      tempItems = tempItems.filter(
        (item) =>
          item.name.toLowerCase().search(inputText.toLowerCase().trim()) !== -1
      );
    }

    tempItems = tempItems.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    setItems(tempItems);
    !tempItems.length ? setResult(false) : setResult(true);
  };

  useEffect(() => {
    findResults();
  }, [review, brand, inputText, price]);

  return (
    <div className="page">
      {/* <Header /> */}
      <SearchBar value={inputText} changeValue={handleSearch} />

      <div className="main">
        <div className="sidebar">
          <FilterPanel
            ReviewValue={review}
            onReviewChange={handleReview}
            BrandValue={brand}
            onBrandValueChange={handleBrand}
            priceValue={price}
            onPriceValueChange={handlePrice}
          />
        </div>
        <div className="main_list">
          {result ? (
            <ListView items={items} />
          ) : (
            <h1> No results for Search and Filters : {inputText}</h1>
          )}
        </div>
      </div>

    </div>
  );
}
