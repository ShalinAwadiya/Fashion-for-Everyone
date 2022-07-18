//Author: Manan Amin (B00897712)

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import algoliasearch from 'algoliasearch/lite';

import './styles.css';
import ListView from '../../components/ListView';
import FilterPanel from '../../components/FilterPanel';

const appId = 'FXM5Z7L8QK';
const apiKey = '8742666d8583123913b0ff879eb4d742';

const client = algoliasearch(appId, apiKey);
const index = client.initIndex('products');

export default function SeachPage() {
  let params = useParams();
  const [brand, setBrand] = useState(null);
  const [review, setReview] = useState(null);
  const [price, setPrice] = useState([1, 1000]);
  const [brandList, setBrandList] = useState([]);

  const [items, setItems] = useState([]);
  const [displayresult, setDisplayResult] = useState([]);
  const [result, setResult] = useState(true);

  // Algolia Search Config

  const handleReview = (event, value) => {
    !value ? null : setReview(value);
  };
  const handleBrand = (event, value) => {
    !value ? null : setBrand(value);
  };
  const handlePrice = (event, value) => {
    !value ? null : setPrice(value);
  };

  useEffect(() => {
    // with params
    let searchQuery = params.query.replace('-', ' ');
    if (searchQuery === 'all') searchQuery = '';
    index
      .search(searchQuery, {
        hitsPerPage: 9,
      })
      .then(({ hits }) => {
        let brands = new Set();
        let min = 100;
        let max = 100;
        hits.forEach((pro) => {
          brands.add(pro.brand.toLowerCase());
          if (pro.price < min) min = pro.price;
          if (pro.price > max) max = pro.price;
        });
        setPrice([min, max]);
        setBrandList(brands);
        setItems(hits);
        setDisplayResult(hits);
      });
  }, [params]);

  useEffect(() => {
    if (items) findResults();
  }, [items, review, brand, price]);

  const findResults = () => {
    let tempItems = items;

    if (review) {
      tempItems = tempItems.filter(
        (item) => parseInt(item.rating, 10) === parseInt(review, 10)
      );
    }

    if (brand) {
      tempItems = tempItems.filter(
        (item) => item.brand.toLowerCase() === brand.toLowerCase()
      );
    }

    tempItems = tempItems.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    setDisplayResult(tempItems);
    !tempItems.length ? setResult(false) : setResult(true);
  };
  return (
    <div className="page">
      <div className="main">
        <div className="sidebar">
          <FilterPanel
            ReviewValue={review}
            onReviewChange={handleReview}
            BrandValue={brand}
            onBrandValueChange={handleBrand}
            priceValue={price}
            onPriceValueChange={handlePrice}
            brandList={brandList}
          />
        </div>
        <div className="main_list">
          {result ? (
            <ListView items={displayresult} />
          ) : (
            <h1> No results for Search and Filters : {params.query}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
