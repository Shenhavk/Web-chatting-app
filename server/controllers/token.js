const registrationService = require('../services/registration');

const createToken = async (req, res) => {
    const token = await registrationService.generateToken(req.body.username, req.body.password);
    if (token === 'Invalid username and/or password') {
        res.status(404).send(token);
    }
    else {
        res.status(200).send(token);
    }
};

module.exports = { createToken }