const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const api = require('./routes');

app.get('/', (req, res) => {
    res.send('Backend authentication service');
});

const PORT = process.env.PORT || 5000;

const credentials = {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/cert.pem'),
};

const server = https.createServer(credentials, app);

server.listen(PORT);

app.use('/api', api);
