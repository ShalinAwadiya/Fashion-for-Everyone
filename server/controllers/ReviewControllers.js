const express = require("express");
var mongoose = require("mongoose");
const ReviewModel = require("../models/Review");
const UserModel = require("../models/user")
const ProductModel = require("../models/product");

async function addReview(req, res, next){
    try {
        let userId = req.body.user_id;
        let productId = req.body.product_id;
        let reviewMessage = req.body.reviewMessage;
        let reviewScore = req.body.reviewScore;
        let user = await UserModel.findOne({firebaseId: userId});
        console.log('user for give  review is', user);

        const review = await ReviewModel.findOne({ userId: userId, productId: productId});
        console.log('already review presents?', review);

        //only one review allowed for a user per product
        if(review){
            return res.status(409).send({ message: 'Review Already Provided by user for this project' });
        }

        await ReviewModel.create({
            userId: userId,
            userName: user.name,
            productId: productId,
            reviewMessage: reviewMessage,
            reviewScore: reviewScore
        });
        return res.status(201).send({message:"Review Created"})
    }
    catch (err){
        console.log(err)
        return res.status(500).send({message: "error in review creation"})
    }
}

async function getReviewsOfProducts(req, res, next){
    try{
        let productId = req.params.product_id;
        const reviewList = await ReviewModel.find({productId: productId})
        return res.status(200).send(reviewList)
    }
    catch(err){
        return res.status(500).send({message: "error in getting reviews for product"})
    }
}

async function updateReview(req, res, next){
    try{
        const reviewId = req.params.review_id;
        console.log('review id = ', reviewId)
        const review = await ReviewModel.findOne({ reviewId });
        console.log(review)

        if (review==null) {
            return res.status(400).send({ message: 'Review does not exist' });
        }

        review.reviewMessage = req.body.reviewMessage
        review.reviewScore = req.body.reviewScore
        console.log('udpdate review is', review);

        await ReviewModel.findByIdAndUpdate(reviewId, {reviewMessage: req.body.reviewMessage, reviewScore:  req.body.reviewScore});
        return res.status(200).send({ message: 'Review updated successfully' });
    }
    catch (err){
        return res.status(500).send({message: "error in updating the review"});
    }
}

async function removeReview(req, res, next) {
    try {
        const _id = req.params.review_id;
        const review = await ReviewModel.find({ _id });

        console.log(_id)
        console.log(review)

        if (!review.length) {
            return res.status(204).send({ message: 'Review does not exist' });
        } else {
            await ReviewModel.deleteOne({ _id });
        }
        return res.status(200).send({ message: 'Review delete successfully' });
    } catch (err) {
       return res.status(500).send({message: 'error in deleting review'});
    }
}

module.exports = {
    addReview,
    getReviewsOfProducts,
    updateReview,
    removeReview
};