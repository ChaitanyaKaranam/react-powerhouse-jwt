const express = require('express');
const router = express.Router();
const auth = require('./auth');

const AVAILABLE_ROUTES = [
    {
        path: '/auth',
    },
];

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

router.use('/auth', auth);

module.exports = router;
