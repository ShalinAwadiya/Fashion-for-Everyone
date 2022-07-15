const { validationResult } = require("express-validator");
const shippingModel = require("../models/shippingAddress");

async function postShippingAddress(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const shippingAddressDetails  = req.body;
   //Check if the coupon with code req.body.code already exists in the database
   console.log(shippingAddressDetails)
    
    const newShippingAddress = new shippingModel(shippingAddressDetails);
    console.log(newShippingAddress)
    await newShippingAddress.save();
    res.status(201).json({ message: 'Shipping Address Updated' })
   
} catch (err) {
   return res.status(400).json({
       error: err.name,
       message: "something went wrong!"
   });
}

}

module.exports = { postShippingAddress }