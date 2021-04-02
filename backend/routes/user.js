const express = require('express');
const router = express.Router();
const { authenticateRoute } = require('../middlewares/auth');

const AVAILABLE_ROUTES = [
    {
        path: '/api/user/details',
    },
];

router.get('/', authenticateRoute, (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

module.exports = router;
