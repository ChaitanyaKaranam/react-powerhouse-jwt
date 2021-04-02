const jwt = require('jsonwebtoken');
const { SECRET, USER_DB, RSECRET, TOKEN_TYPE } = require('../../config');

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
    if (payload) {
        const accesstoken = jwt.sign(payload, SECRET);
        const refreshtoken = jwt.sign(payload, RSECRET);
        return { accesstoken, refreshtoken };
    }
    return null;
}

function getPayload(token) {
    if (token) {
        return jwt.decode(token);
    }
    return null;
}

function isTokenValid(token, tokenType) {
    if (token && tokenType) {
        const secret = tokenType === TOKEN_TYPE.ACCESS ? SECRET : RSECRET;
        try {
            jwt.verify(token, secret);
            return true;
        } catch {
            return false;
        }
    }
    return false;
}

module.exports = {
    authenticate,
    getPayload,
    isTokenValid,
    generateToken,
};
