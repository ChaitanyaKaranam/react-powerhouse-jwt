const express = require('express');
const { authenticateRoute, adminRoute } = require('../middlewares/auth');
const router = express.Router();

const AVAILABLE_ROUTES = [
    {
        path: '/api/admin/users',
    },
];

router.use('/', authenticateRoute, adminRoute);

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

module.exports = router;
