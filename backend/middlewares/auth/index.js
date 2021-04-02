const { TOKEN_TYPE, ROLES_DB } = require('../../config');
const {
    isTokenValid,
    generateToken,
    getPayload,
} = require('../../services/auth');

function authenticateRoute(req, res, next) {
    if (req.cookies) {
        const { accesstoken, refreshtoken } = req.cookies;
        if (accesstoken) {
            if (isTokenValid(accesstoken, TOKEN_TYPE.ACCESS)) {
                return next();
            }
            return res.status(401).send('Unauthorized');
        }
        if (refreshtoken) {
            if (isTokenValid(refreshtoken, TOKEN_TYPE.REFRESH)) {
                const payload = getPayload(refreshtoken);
                const { accesstoken } = generateToken(payload);
                // Add token to res.locals
                res.locals.accesstoken = accesstoken;

                // Add cookies
                res.cookie('accesstoken', accesstoken, {
                    httpOnly: true,
                    secure: true,
                });
                return next();
            }
            return res.status(401).send('Unauthorized');
        }
    }
    return res.status(401).send('Unauthorized');
}

function adminRoute(req, res, next) {
    if (req.cookies) {
        const { accesstoken } = req.cookies;
        let token = accesstoken ? accesstoken : res.locals.accesstoken;
        const payload = getPayload(token);
        if (payload['role'] === ROLES_DB.ADMIN) {
            return next();
        }
    }
    return res.status(401).send('Unauthorized');
}

module.exports = {
    authenticateRoute,
    adminRoute,
};
