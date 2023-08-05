const registrationService = require('../services/registration');

const createUser = async (req, res) => {
    const newUser = await registrationService.createUser(req.body.username, req.body.password, req.body.displayName, req.body.profilePic);
    res.json();
};

const index = async (req, res) => {
    const user = await registrationService.getUser(req.params.id, req.headers.authorization);
    const userDetails = { username: user.username, displayName: user.displayName, profilePic: user.profilePic };
    res.status(200).json(userDetails)
}


const searchUser = async (req, res, next) => {
    const user = await registrationService.getUser(req.params.id, req.headers.authorization);
    if (user === 'No such user') {
        return res.status(404).json(user);
    }
    else {
        return next();
    }
};

module.exports = { createUser, searchUser, index }