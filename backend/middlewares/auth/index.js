const { TOKEN_TYPE } = require('../../config');
const {
    isTokenValid,
    generateToken,
    getPayload,
} = require('../../services/auth');

function authenticateRoute(req, res, next) {
    console.log('called');
    if (req.cookies) {
        const { accesstoken, refreshtoken } = req.cookies;
        if (accesstoken) {
            if (isTokenValid(accesstoken, TOKEN_TYPE.ACCESS)) {
                console.log('access authenticated');
                return next();
            }
            return res.status(401).send('Unauthorized');
        }
        if (refreshtoken) {
            if (isTokenValid(refreshtoken, TOKEN_TYPE.REFRESH)) {
                const payload = getPayload(refreshtoken);
                const { accesstoken } = generateToken(payload);
                // Add cookies
                res.cookie('accesstoken', accesstoken, {
                    httpOnly: true,
                    secure: true,
                });
                console.log('refresh authenticated');
                return next();
            }
            return res.status(401).send('Unauthorized');
        }
    }
    return res.status(401).send('Unauthorized');
}

module.exports = {
    authenticateRoute,
};
