// Imports

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// Configure Middleware

server.use(express.json());
server.use(cors());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Hi There!' });
})

module.exports = server;