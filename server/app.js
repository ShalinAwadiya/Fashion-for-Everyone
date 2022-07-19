/**
 * Author: Deep Adeshra (dp974154@dal.ca)
 *
 * */
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

const checkAuth = require("./middlewares/authorization");
const addUserRole = require("./middlewares/user_role_middleware");

// ---------------------------------DATABASE CONFIG-----------------------------
var mongoUrl =
  "mongodb+srv://deep:webproject@web-project.pmnnubo.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to the database"));

// -----------------------------------------------------------------------------

var app = express();

// ---------------------------------MIDDLEWARES---------------------------------
app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(addUserRole);
// -----------------------------------------------------------------------------

// --------------------------------ROUTE CONFIG---------------------------------
var usersRouter = require("./routes/users");
var couponsRouter = require("./routes/coupons");
var productsRouter = require("./routes/products");
var reviewRouter = require("./routes/reviews");
var cartRouter = require("./routes/carts");
var complainRouter = require("./routes/complains");
var subscriptionRouter = require("./routes/subscription");
var shippingAddressRouter = require("./routes/shippingAddress");
var blogRouter = require("./routes/blog");
var orderRouter = require("./routes/orders");
var wishlistRouter = require("./routes/wishlists");

app.use("/users", checkAuth, usersRouter);
app.use("/coupons", checkAuth, couponsRouter);
app.use("/products", checkAuth, productsRouter);
app.use("/reviews", checkAuth, reviewRouter);
app.use("/cart", checkAuth, cartRouter);
app.use("/complains", checkAuth, complainRouter);
app.use("/", checkAuth, subscriptionRouter);
app.use("/", checkAuth, shippingAddressRouter);
app.use("/blogs", blogRouter);
app.use("/order", checkAuth, orderRouter);
app.use("/wishlist", checkAuth, wishlistRouter);
// -----------------------------------------------------------------------------

module.exports = app;
