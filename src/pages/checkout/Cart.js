import React from 'react';
import './index.css'

export default function CartInfo(props) {
	const itemsPrice1 = 10
	const itemsPrice2 = 50
	const itemsPrice3 = 20
	const itemsPrice = itemsPrice1 + itemsPrice2 + itemsPrice3
	const taxPrice = itemsPrice * 0.14;
	const shippingPrice = itemsPrice > 2000 ? 0 : 50;
	const totalPrice = itemsPrice + taxPrice + shippingPrice;

	return (
		<aside className="block col-1">
			<h2>Cart Total</h2>
			<img className="center" src="./Fashion.png"></img>
			<h3>Order Summary</h3>
			<hr></hr>
			<div className="row">
				<div className="col-2">Item 1</div>
				<div className="col-1">${itemsPrice1.toFixed(2)}</div>
			</div>
			<div className="row">
				<div className="col-2">Item 2</div>
				<div className="col-1">${itemsPrice2.toFixed(2)}</div>
			</div>
			<div className="row">
				<div className="col-2">Item 3</div>
				<div className="col-1">${itemsPrice3.toFixed(2)}</div>
			</div>
			<hr></hr>
			<div className="row">
				<div className="col-2">Tax Price</div>
				<div className="col-1">${taxPrice.toFixed(2)}</div>
			</div>
			<div className="row">
				<div className="col-2">Shipping Price</div>
				<div className="col-1">${shippingPrice.toFixed(2)}</div>
			</div>
			<hr></hr>
			<div className="row">
				<div className="col-2"><strong>Total Price</strong></div>
				<div className="col-1">${totalPrice.toFixed(2)}</div>
			</div>

		</aside>
	)
}