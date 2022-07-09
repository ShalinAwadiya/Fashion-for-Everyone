const UserModel = require("../models/user");

async function addUserRole(req, res, next) {
    const oldJson = res.json;

    res.json = async (body) => {
        res.locals.body = body;

        if (req.user) {
            const dbUser = await UserModel.findOne({ firebaseId: req.user.user_id });
            body.user_role = dbUser.role;
        }

        return oldJson.call(res, body);
    };

    next();
}

module.exports = addUserRole;