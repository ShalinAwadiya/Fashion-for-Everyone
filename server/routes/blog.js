//Minal Rameshchandra Khona - B00873733
var express = require('express');
const { postBlog, getBlogs, deleteBlogs } = require('../controllers/blogController');
var router = express.Router();

router.post('/post-blog', postBlog);
router.get('/', getBlogs);
router.delete('/delete/:blogId', deleteBlogs);

module.exports = router;