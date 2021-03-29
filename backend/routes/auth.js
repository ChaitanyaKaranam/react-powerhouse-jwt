const express = require('express');
const router = express.Router();

const AVAILABLE_ROUTES = [
    {
        path: '/login',
    },
];

router.get('/', (req, res) => {
    res.send(AVAILABLE_ROUTES);
});

router.get('/login', (req, res) => {
    res.send('Login route');
});

module.exports = router;
