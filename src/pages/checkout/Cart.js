import React from 'react';

export default function CartInfo(props) {
	const itemsPrice1 = 10
	const itemsPrice2 = 50
	const itemsPrice3 = 20
	const itemsPrice = itemsPrice1 + itemsPrice2 + itemsPrice3
	const taxPrice = itemsPrice * 0.14;
	const shippingPrice = itemsPrice > 2000 ? 0 : 50;
	const totalPrice = itemsPrice + taxPrice + shippingPrice;

	return (
		<aside className="col-md-4 mt-5">
			<h2>Cart Total</h2>
			{/* <img className="center" src="./Fashion.png"></img> */}
			<h3>Order Summary</h3>
			<hr></hr>
			<div className="row">
				<div className="col-md-6">Item 1</div>
				<div className="col-md-6">${itemsPrice1.toFixed(2)}</div>
			</div>
			<div className="row">
				<div className="col-md-6">Item 2</div>
				<div className="col-md-6">${itemsPrice2.toFixed(2)}</div>
			</div>
			<div className="row">
				<div className="col-md-6">Item 3</div>
				<div className="col-md-6">${itemsPrice3.toFixed(2)}</div>
			</div>
			<hr></hr>
			<div className="row">
				<div className="col-md-6">Tax Price</div>
				<div className="col-md-6">${taxPrice.toFixed(2)}</div>
			</div>
			<div className="row">
				<div className="col-md-6">Shipping Price</div>
				<div className="col-md-6">${shippingPrice.toFixed(2)}</div>
			</div>
			<hr></hr>
			<div className="row">
				<div className="col-md-6"><strong>Total Price</strong></div>
				<div className="col-md-6">${totalPrice.toFixed(2)}</div>
			</div>
		</aside>
	)
}