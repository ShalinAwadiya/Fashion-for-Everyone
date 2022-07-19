import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ShowProducts from './pages/products/ShowProducts';

import Home from './pages/home/Home';
import SignUp from './pages/user-auth/signup';
import Header from './components/header';
import Login from './pages/user-auth/login';
import ForgetPassword from './pages/user-auth/forget-password';
import Footer from './components/footer';
import CouponsHomePage from './pages/coupon/coupons-home-page';
import SeachPage from './pages/search-page';
import ComplainForm from './pages/complain/ComplainForm';
import EditComplainForm from './pages/complain/EditComplainForm';
import ComplainTable from './pages/complain/ComplainTable';
import ReplyTable from './pages/complain/ReplyTable';
import ReplyComplain from './pages/complain/ReplyComplain';
import AllComplainTable from './pages/complain/AllComplainTable';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Profile from './pages/user-auth/profile';
import ProductPage from './pages/products/ProductPage';
import ShowReviews from './pages/reviews/ShowReviews';
import Fashion from './pages/blogging/fashion-blogging';
import CreateBlog from './pages/blogging/create-blog/createBlog';
import PostBlog from './pages/blogging/post-blog/postBlog';
import Orders from './pages/orders/Orders';
import Collection from './pages/collection/Collection';
import Wishlist from './pages/Wishlist/Wishlist';
import { PrivateRoute, PublicRoute } from './utils/routeProtector';
import PostCoupon from './pages/coupon/post-coupon';
import SavedCoupon from './pages/coupon/saved-coupons';
import AddressForm from './pages/checkout/AddressForm';
import PaymentForm from './pages/checkout/PaymentForm';
import Review from './pages/checkout/Review';
import PlacedInfo from './pages/checkout/OrderPlaced';
import Action from './pages/user-auth/action';
import User_Products from './pages/products/user_products';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<PublicRoute restrictedToPublicOnly={false} />}
            >
              <Route exact path="/" element={<Home />} />
              <Route path="/search/:query" element={<SeachPage />} />
              <Route path="/_auth/action" element={<Action />} />
            </Route>
            <Route
              path="/"
              element={<PublicRoute restrictedToPublicOnly={true} />}
            >
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/post_complain" element={<ComplainForm />} />
              <Route path="/view_complain" element={<ComplainTable />} />
              <Route
                path="/edit_complain/:complainId"
                element={<EditComplainForm />}
              />
              <Route
                path="/replied_complain/:complainId"
                element={<ReplyTable />}
              />
              <Route
                path="/admin/view_complain"
                element={<AllComplainTable />}
              />
              <Route
                path="/admin/reply_complain/:complainId"
                element={<ReplyComplain />}
              />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="/products" element={<User_Products />}></Route>
              <Route path="/show_products" element={<ShowProducts />}></Route>
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/product/review/:id" element={<ShowReviews />} />
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/fashion-blogs" element={<Fashion />} />
              <Route path="/fashion/createPost" element={<CreateBlog />} />
              <Route path="/fashion-blogs/post" element={<PostBlog />} />
              <Route path="/collection/:collection" element={<Collection />} />
              <Route path="/post-coupons" element={<PostCoupon />} />
              <Route path="/saved-coupons" element={<SavedCoupon />} />
              <Route path="/review" element={<Review />} />
              <Route path="/order_placed" element={<PlacedInfo />} />
              <Route path="/checkout" element={<AddressForm />} />
              <Route path="/payment" element={<PaymentForm />} />
              <Route path="/coupons" element={<CouponsHomePage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
