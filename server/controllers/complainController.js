// Shalin Hasanbhai Awadiya - B00892907
const ComplainModel = require("../models/complain");

/**
 * This function is used by user to add a complain.
 * usage: POST /user/insertComplain
 */
async function userInsertComplain(request, response, next) {
  try {
    const complain = await ComplainModel.create(request.body);
    response.status(200).json({ message: "Complain Successfully inserted" });
  } catch (error) {
    response.status(500).send(error);
  }
}
/**
 * This function is used to retreive all complains for a user using userId.
 * usage: GET /user/viewComplains/:userId
 */
async function userViewComplain(request, response, next) {
  const userId = request.params.userId;
  console.log(userId);

  const complains = await ComplainModel.find({
    complainFrom_LoginId: userId,
  });

  try {
    response.status(200).json({ complains: complains });
  } catch (error) {
    response.status(500).send(error);
  }
}
/**
 * This function is used to retreive single complain for a user to edit.
 * usage: GET /user/getComplain/:complainId
 */

async function userGetComplain(request, response, next) {
  const complainId = request.params.complainId;
  console.log("complainId", complainId);
  const complain = await ComplainModel.find({ complainId: complainId });
  try {
    response.status(200).json({ complain: complain });
  } catch (error) {
    response.status(500).send(error);
  }
}
/**
 * This function is used to edit a complain by the user.
 * usage: PUT /user/editComplain/
 */
async function userEditComplain(request, response, next) {
  const filter = { complainId: request.body.complainId };
  const update = {
    complainSubject: request.body.complainSubject,
    complainDescription: request.body.complainDescription,
    complainDate: request.body.complainDate,
    complainTime: request.body.complainTime,
    complainImage: request.body.complainImage,
  };
  let complain = await ComplainModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  try {
    response.status(200).json({ message: "Complain Edited" });
  } catch (error) {
    response.status(500).send(error);
  }
}
/**
 * This function is used to delete a complain by the user.
 * usage: DELETE /user/deleteComplain/:complainId
 */
async function userDeleteComplain(request, response, next) {
  const complainId = request.params.complainId;
  console.log(complainId);

  try {
    await ComplainModel.deleteOne({ complainId: complainId });
    response.status(200).json({ message: "Complain Deleted" });
  } catch (error) {
    response.status(500).send(error);
  }
}
/**
 * This function is used to view all complains by the administrator.
 * usage: GET /admin/viewComplains
 */
async function adminViewComplain(request, response, next) {
  const complains = await ComplainModel.find({});
  try {
    response.status(200).json({ complains: complains });
  } catch (error) {
    response.status(500).send(error);
  }
}
/**
 * This function is used to insert reply by the administrator.
 * usage: PUT /admin/insertComplainReply
 */
async function adminInsertComplainReply(request, response, next) {
  const filter = { complainId: request.body.complainId };
  const update = {
    complainStatus: request.body.complainStatus,
    replySubject: request.body.replySubject,
    replyMessage: request.body.replyMessage,
    replyDate: request.body.replyDate,
    replyTime: request.body.replyTime,
  };
  let complain = await ComplainModel.findOneAndUpdate(filter, update, {
    new: true,
  });
  try {
    response.status(200).json({ complain: complain });
  } catch (error) {
    response.status(500).send(error);
  }
}

/**
 * This function is used to view complain reply by the user.
 * usage: GET /user/viewComplainReply/:complainId
 */
async function userViewComplainReply(request, response, next) {
  const complainId = request.params.complainId;
  console.log(complainId);
  const complain = await ComplainModel.find({
    complainId: complainId,
  });
  try {
    response.status(200).json({ complain: complain });
  } catch (error) {
    response.status(500).send(error);
  }
}

module.exports = {
  userInsertComplain,
  userViewComplain,
  userGetComplain,
  userEditComplain,
  adminViewComplain,
  userViewComplainReply,
  adminInsertComplainReply,
  userDeleteComplain,
};
