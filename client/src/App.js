import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ShowProducts from "./pages/products/ShowProducts";

import Home from "./pages/home/Home";
import SignUp from "./pages/user-auth/signup";
import Header from "./components/header";
import Login from "./pages/user-auth/login";
import ForgetPassword from "./pages/user-auth/forget-password";
import Footer from "./components/footer";
import CouponsHomePage from "./pages/coupon/coupons-home-page";
import SeachPage from "./pages/search-page";
import ComplainForm from "./pages/compain/ComplainForm";
import EditComplainForm from "./pages/compain/EditComplainForm";
import ComplainTable from "./pages/compain/ComplainTable";
import ReplyTable from "./pages/compain/ReplyTable";
import ReplyComplain from "./pages/compain/ReplyComplain";
import AllComplainTable from "./pages/compain/AllComplainTable";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/user-auth/profile";
import ProductPage from "./pages/products/ProductPage";
import ShowReviews from "./pages/reviews/ShowReviews";
import Fashion from "./pages/blogging/fashion-blogging";
import CreateBlog from "./pages/blogging/create-blog/createBlog";
import PostBlog from "./pages/blogging/post-blog/postBlog";
import Orders from "./pages/orders/Orders";
import Collection from "./pages/collection/Collection";
import Wishlist from "./pages/Wishlist/Wishlist";
import { PrivateRoute, PublicRoute } from "./utils/routeProtector";
import PostCoupon from "./pages/coupon/post-coupon";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={<PublicRoute restrictedToPublicOnly={false} />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/coupons" element={<CouponsHomePage />} />
              <Route path="/search" element={<SeachPage />} />
            </Route >

            <Route path='/' element={<PublicRoute restrictedToPublicOnly={true} />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route >

            <Route path='/' element={<PrivateRoute />}>
              <Route path="/post_complain" element={<ComplainForm />} />
              <Route path="/view_complain" element={<ComplainTable />} />
              <Route path="/edit_complain" element={<EditComplainForm />} />
              <Route path="/replied_complain" element={<ReplyTable />} />
              <Route path="/admin/view_complain" element={<AllComplainTable />} />
              <Route path="/admin/reply_complain" element={<ReplyComplain />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="/show_products" element={<ShowProducts />}></Route>
              <Route path="/product" element={<ProductPage />} />
              <Route path="/product/review" element={<ShowReviews />} />
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/fashion-blogs" element={<Fashion />} />
              <Route path="/fashion/createPost" element={<CreateBlog />} />
              <Route path="/fashion-blogs/post" element={<PostBlog />} />
              <Route path="/collection/:collection" element={<Collection />} />
              <Route path="/post-coupons" element={<PostCoupon />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
