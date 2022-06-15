import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ShowProducts from "./pages/products/ShowProducts";

import Home from "./pages/home/Home";
import SignUp from "./pages/signup";
import Header from "./components/header";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget-password";
import Footer from "./components/footer";
import CouponsHomePage from "./pages/coupon/CouponsHomePage";
import SeachPage from "./pages/search-page";
import ComplainForm from "./pages/compain/ComplainForm";
import ComplainTable from "./pages/compain/ComplainTable";
import ReplyTable from "./pages/compain/ReplyTable";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/checkout";
import Profile from "./pages/profile";
import ProductPage from "./pages/products/ProductPage";
import ShowReviews from "./pages/reviews/ShowReviews";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/coupons" element={<CouponsHomePage />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/search" element={<SeachPage />} />
            <Route path="/post_complain" element={<ComplainForm />} />
            <Route path="/view_complain" element={<ComplainTable />} />
            <Route path="/replied_complain" element={<ReplyTable />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/show_products" element={<ShowProducts />}></Route>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/review" element={<ShowReviews />} />
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
