/**
 * Author: Deep Adeshra (dp974154@dal.ca)
 *
 * */

const { validationResult } = require("express-validator");
const UserModel = require("../models/user");
const admin = require('../config/firebase-admin');

/**
 * Registers user in MongoDB
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function registerUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firebaseId, name } = req.body;
    const users = await UserModel.find({ firebaseId });

    if (users.length) {
      return res.status(200).send({ message: "user already exists" });
    }

    await UserModel.create({ email, firebaseId, name });

    return res.status(201).send({ message: "user created" })
  } catch (err) {
    return next(err);
  }
}

/**
 * Give information about the user. User will be determined from Auth. header.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function getUser(req, res, next) {
  try {
    const user = req.user;
    const dbUser = await UserModel.findOne({firebaseId: user.user_id});
    return res.status(200).send({ ...user, ...dbUser._doc });
  } catch (err) {
    return next(err);
  }
}

/**
 * Updates user data in MongoDb
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function updateUser(req, res, next) {
  try {
    const user = req.user;
    const { email, name } = req.body;

    await UserModel.findOneAndUpdate({ firebaseId: user.user_id }, { $set: { email: email, name: name } });

    return res.status(200).send({ success: "true" });
  } catch (err) {
    return next(err)
  }
}

module.exports = { getUser, registerUser, updateUser }