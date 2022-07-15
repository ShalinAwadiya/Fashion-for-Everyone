// Shalin Hasanbhai Awadiya - B00892907
const ComplainModel = require("../models/complain");

async function userInsertComplain(request, response, next) {
  try {
    const complain = await ComplainModel.create(request.body);
    response.status(200).json({ message: "Complain Successfully inserted" });
  } catch (error) {
    response.status(500).send(error);
  }
}
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

async function adminViewComplain(request, response, next) {
  const complains = await ComplainModel.find({});
  try {
    response.status(200).json({ complains: complains });
  } catch (error) {
    response.status(500).send(error);
  }
}

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
