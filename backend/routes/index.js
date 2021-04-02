const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const admin = require('./admin');

const AVAILABLE_ROUTES = [
    {
        path: '/api/auth',
    },
    {
        path: '/api/user',
    },
    {
        path: '/api/admin',
    },
];

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

router.use('/auth', auth);
router.use('/user', user);
router.use('/admin', admin);

module.exports = router;
