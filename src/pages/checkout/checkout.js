import { Fragment } from 'react';
import CartInfo from './Cart';
import Info from './Info';

function Checkout(props) {
  return (
    <div className='col-md-12 row'>
      <Info />
      <CartInfo />
    </div>
  )
}

export default Checkout;