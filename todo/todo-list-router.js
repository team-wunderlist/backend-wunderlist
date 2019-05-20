const router = require('express').Router();

const Todo = require('./todo-list-model');

// Get To Do List

router.get('/', (req, res) => {
    Todo.getTodoList()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'To do list could not be retrieved.' })
        })
})

module.exports = router;