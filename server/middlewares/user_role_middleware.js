/**
 * Author: Deep Adeshra (dp974154@dal.ca)
 *
 * */
const UserModel = require("../models/user");

/**
 * Adds user role in each outgoing request.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function addUserRole(req, res, next) {
    const oldJson = res.json;

    res.json = async (body) => {
        res.locals.body = body;

        if (req.user) {
            const dbUser = await UserModel.findOne({ firebaseId: req.user.user_id });
            body.user_role = dbUser?.role;
        }

        return oldJson.call(res, body);
    };

    next();
}

module.exports = addUserRole;