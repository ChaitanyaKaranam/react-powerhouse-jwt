const jwt = require('jsonwebtoken');
const { SECRET, USER_DB, RSECRET } = require('../../config');

async function authenticate(payload) {
    return new Promise((resolve, reject) => {
        let { username, password } = payload;
        if (USER_DB[username] && USER_DB[username]['password'] === password) {
            return resolve(
                generateToken({ username, role: USER_DB[username]['role'] })
            );
        }
        return reject('Invalid Username / Password');
    });
}

function generateToken(payload) {
    let accesstoken = jwt.sign(payload, SECRET);
    let refreshtoken = jwt.sign(payload, RSECRET);
    return { accesstoken, refreshtoken };
}

function getPayload(token) {
    if (token) {
        return jwt.decode(token);
    }
    return null;
}

module.exports = {
    authenticate,
    getPayload,
};
