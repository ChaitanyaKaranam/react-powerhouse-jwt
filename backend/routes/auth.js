const express = require('express');
const { authenticateRoute } = require('../middlewares/auth');
const { authenticate, getPayload } = require('../services/auth');
const router = express.Router();

const AVAILABLE_ROUTES = [
    {
        path: '/api/auth/login',
    },
];

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Enter username and password');
    }
    authenticate(req.body)
        .then(({ accesstoken, refreshtoken }) => {
            // Get payload
            const payload = getPayload(accesstoken);

            // Add cookies
            res.cookie('accesstoken', accesstoken, {
                httpOnly: true,
                secure: true,
            });
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                secure: true,
            });

            return res.status(200).send(payload);
        })
        .catch((err) => {
            console.log(err);
            return res.status(401).send('Invalid username/ password');
        });
});

router.get('/verify', authenticateRoute, (req, res) => {
    if (req.cookies) {
        const { accesstoken } = req.cookies;
        let token = accesstoken ? accesstoken : res.locals.accesstoken;
        const payload = getPayload(token);
        return res.status(200).send(payload);
    }
    return res.status(400).send({
        status: 400,
        statusText: 'Bad request',
    });
});

module.exports = router;
