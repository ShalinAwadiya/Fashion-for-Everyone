//Minal Rameshchandra Khona - B00873733
const BlogModel = require("../models/blog");
const { validationResult } = require("express-validator");

/**
 * This function posts a new blog
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function postBlog(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const blog = new BlogModel(req.body);
        await blog.save(req.body);

        return res.status(201).send({ message: 'Blog Posted Successfully' })
    } catch (err) {
        return res.status(400).json({
            error: err.name,
            message: err.message.split(':')[2].trim()
        });
    }
}

/**
 * This function gets all the available blogs
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
async function getBlogs(req, res, next) {
    try {
        let blogs = await BlogModel.find();
        return res.status(200).send({ blogs })
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    postBlog,
    getBlogs
}