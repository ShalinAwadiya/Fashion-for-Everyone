import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ShowProducts from './ShowProducts';

import SignUp from './routes/signup';
import Header from './components/header';
import Login from './routes/login';
import ForgetPassword from './routes/forget-password';
import Footer from './components/footer';
import CouponsHomePage from './pages/coupon/CouponsHomePage';
import SeachPage from './pages/search-page';
import ComplainForm from './pages/compain/ComplainForm';
import ComplainTable from './pages/compain/ComplainTable';
import ReplyTable from './pages/compain/ReplyTable';
import Info from './pages/checkout/Info';
import CartInfo from './pages/checkout/Cart';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/coupons" element={<CouponsHomePage />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/search' element={<SeachPage />} />
            <Route path='/complains' element={<ComplainForm />} />
            <Route path='/view_complains' element={<ComplainTable />} />
            <Route path='/replied_complain' element={<ReplyTable />} />
            <Route path='/checkout' element={
              <div className="row globalstyle">
                <Info></Info>
                <CartInfo />
              </div>
            } />
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/products' element={<ShowProducts />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}


export default App;
