// Shalin Hasanbhai Awadiya - B00892907
/*
This file contains both the admin side and user side routes for complain management
*/
var express = require("express");
const {
  userInsertComplain,
  userViewComplain,
  userGetComplain,
  userEditComplain,
  adminViewComplain,
  userViewComplainReply,
  adminInsertComplainReply,
  userDeleteComplain,
} = require("../controllers/complainController");
var router = express.Router();

router.post("/user/insertComplain", userInsertComplain);
router.get("/user/viewComplains/:userId", userViewComplain);
router.get("/user/getComplain/:complainId", userGetComplain);
router.put("/user/editComplain/", userEditComplain);
router.get("/admin/viewComplains", adminViewComplain);
router.get("/user/viewComplainReply/:complainId", userViewComplainReply);
router.put("/admin/insertComplainReply", adminInsertComplainReply);
router.delete("/user/deleteComplain/:complainId", userDeleteComplain);

module.exports = router;
