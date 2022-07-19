const express = require("express");
var mongoose = require("mongoose");
const ReviewModel = require("../models/Review");

async function addReview(req, res, next){
    try {
        let userId = req.user_id;
        let productId = req.product_id;
        let reviewMessage = req.reviewMessage;
        let reviewScore = req.reviewScore;

        const review = await ReviewModel.findOne({ userId: userId, productId: productId});
        //only one review allowed for a user per product
        if(review){
            return res.status(409).send({ message: 'Review Already Provided by user for this project' });
        }

        await ReviewModel.create({
            userId: userId,
            productId: productId,
            reviewMessage: reviewMessage,
            reviewScore: reviewScore
        });
        return res.status(201).send({message:"Review Created"})
    }
    catch (err){
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
        const review = await ReviewModel.findOne({ reviewId });
        if (!review.length) {
            return res.status(204).send({ message: 'Review does not exist' });
        }
        await ReviewModel.findByIdAndUpdate(reviewId, req.body);
        return res.status(200).send({ message: 'Review updated successfully' });
    }
    catch (err){
        return res.status(500).send({message: "error in updating the review"});
    }
}

async function removeReview(req, res, next) {
    try {
        const reviewId = req.params.review_id;
        const review = await ReviewModel.find({ reviewId });
        if (!review.length) {
            return res.status(204).send({ message: 'Review does not exist' });
        } else {
            await ReviewModel.deleteOne({ reviewId });
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