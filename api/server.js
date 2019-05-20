// Imports

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

// Import Routers

const todoListRouter = require('../todo/todo-list-router');
const workToDosRouter = require('../work/work-todos-router');
const groceryToDosRouter = require('../grocery/grocery-todos-router');

// Configure Middleware

server.use(express.json());
server.use(cors());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Hi There!' });
})

server.use('/api/todos', todoListRouter);
server.use('/api/worktodos', workToDosRouter);
server.use('/api/grocerytodos', groceryToDosRouter);

module.exports = server;