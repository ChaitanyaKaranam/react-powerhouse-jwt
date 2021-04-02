const express = require('express');
const { authenticate, getPayload } = require('../services/auth');
const router = express.Router();

const AVAILABLE_ROUTES = [
    {
        path: '/login',
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

module.exports = router;
