const { validationResult } = require("express-validator");
const subscriptionModel = require("../models/subscription");

async function subscribeUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const emailId  = req.body;
   //Check if the coupon with code req.body.code already exists in the database
   console.log("Hi")
   
    const newEmail = new subscriptionModel({...emailId});
    await newEmail.save();
    res.status(201).json({ message: 'Subscriber Created Successfully' })
   
} catch (err) {
   return res.status(400).json({
       error: err.name,
       message: "something went wrong!"
   });
}

// async function getSubscription(req, res, next) {
//     try {
//         let subscribers = await subscriptionModel.find();
//         return res.status(201).send({ subscribers })
//     } catch (err) {
//         return next(err);
//     }
// }
}

module.exports = { subscribeUser }