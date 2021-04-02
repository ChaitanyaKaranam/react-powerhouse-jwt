const express = require('express');
const router = express.Router();
const { authenticateRoute } = require('../middlewares/auth');

const AVAILABLE_ROUTES = [
    {
        path: '/api/user/details',
    },
];

router.use('/', authenticateRoute);

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

router.get('/details', (req, res) => {
    res.send('success');
});

module.exports = router;
