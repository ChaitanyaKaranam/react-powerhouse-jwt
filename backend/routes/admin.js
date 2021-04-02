const express = require('express');
const router = express.Router();

const AVAILABLE_ROUTES = [
    {
        path: '/api/admin/users',
    },
];

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

module.exports = router;
