import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ShowProducts from './pages/products/ShowProducts';
import ProductPage from './pages/products/ProductPage'
import ShowReviews from './pages/reviews/ShowReviews';

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<ShowProducts/>}></Route>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/review" element={<ShowReviews />} />
        </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
