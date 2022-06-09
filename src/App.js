import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import SignUp from './routes/signup';
import Header from './components/header';
import Login from './routes/login';
import ForgetPassword from './routes/forget-password';
import Footer from './components/footer';
import CouponsHomePage from './pages/CouponsHomePage';
import SeachPage from './pages/search-page';
import ComplainForm from './pages/compain/ComplainForm';
import ComplainTable from './pages/compain/ComplainTable';
import ReplyTable from './pages/compain/ReplyTable';

function App() {
  return (
    <div className="App">
      <Header />
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
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}


export default App;
