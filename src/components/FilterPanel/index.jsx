/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';

import './styles.css';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const sliderStyles = makeStyles({
  thumb: {
    color: '#000',
  },
  track: {
    color: '#000',
  },
});

const toggleStyles = makeStyles({
  root: {
    width: '100%',
    justifyContent: 'space-between',
  },
  toggle: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '.9rem',
    border: '2px solid rgba(0, 0, 0, 0.12)',
    borderRadius: '10px',
    '&.MuiToggleButtonGroup-groupedHorizontal:not(:last-child)': {
      borderRadius: '10px',
    },
    '&.MuiToggleButtonGroup-groupedHorizontal:not(:first-child)': {
      borderRadius: '10px',
      border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    '&.Mui-selected': {
      borderRadius: '10px',
      background: '#000',
      color: '#fff',
    },
    '&.MuiToggleButton-root': {
      '&:hover': {
        background: '#000',
        color: '#fff',
      },
    },
  },
});

function FilterListToggle({ options, value, changeToggle }) {
  const classes = toggleStyles();
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={changeToggle}
      className={classes.root}
    >
      {options.map(({ label, id, value }) => (
        <ToggleButton className={classes.toggle} key={id} value={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

function SliderRange({ value, changePrice }) {
  const classes = sliderStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
        min={10}
        max={500}
        classes={{
          thumb: classes.thumb,
          track: classes.track,
        }}
      />
    </div>
  );
}

export default function FilterPanel({
  ReviewValue,
  onReviewChange,
  BrandValue,
  onBrandValueChange,
  priceValue,
  onPriceValueChange,
}) {
  const brandList = [
    {
      id: 1,
      value: 'nike',
      label: 'Nike',
    },
    {
      id: 2,
      value: 'adidas',
      label: 'Adidas',
    },
    {
      id: 3,
      value: 'fila',
      label: 'Fila',
    },
    {
      id: 4,
      value: 'under-armour',
      label: 'Under Armour',
    },
  ];

  const reviewsList = [
    {
      id: 1,
      value: '1',
      label: '1🌟',
    },
    {
      id: 2,
      value: '2',
      label: '2🌟',
    },
    {
      id: 3,
      value: '3',
      label: '3🌟',
    },
    {
      id: 4,
      value: '4',
      label: '4🌟',
    },
    {
      id: 5,
      value: '5',
      label: '5🌟',
    },
  ];

  return (
    <div>
      <div className="filter-group">
        <p className="label">Reviews</p>

        <FilterListToggle
          options={reviewsList}
          value={ReviewValue}
          changeToggle={onReviewChange}
        />
      </div>
      <div className="filter-group">
        <p className="label">Brand</p>
        <FilterListToggle
          options={brandList}
          value={BrandValue}
          changeToggle={onBrandValueChange}
        />
      </div>
      <div className="filter-group">
        <p className="label-range">Price Range</p>
        <SliderRange value={priceValue} changePrice={onPriceValueChange} />
      </div>
      <div className="filter-group">
        <Button
          variant="outlined"
          onClick={() => {
            window.location.reload();
          }}
        >
          Clear All Filter
        </Button>
      </div>
    </div>
  );
}
