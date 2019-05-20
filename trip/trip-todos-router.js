const router = require('express').Router();

const Todos = require('./trip-todos-model');

// Get To-Do List

router.get('/', (req, res) => {
    Todos.getTodoList()
        .then(todos => {
            res.status(200).json(todos)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'To-do list could not be retrieved.' })
        })
})

// Get To-Do Item By ID

router.get('/:id', (req, res) => {
    Todos.getTodoById(req.params.id)
        .then(todo => {
            if (todo) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({ errorMessage: 'A to-do item with the specified ID does not exist.' })
            }
        })
})

// Add New To-Do Item

router.post('/', (req, res) => {
    if (!req.body.item) {
        res.status(400).json({ errorMessage: 'To-do items cannot be left blank.' })
    } else {
        Todos.addTodo(req.body)
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'Could not add to-do item.'})
            })
    }
})

// Update To-Do Item

router.put('/:id', (req, res) => {
    if (!req.body.item) {
        res.status(400).json({ errorMessage: 'To-do items cannot be left blank.' })
    } else {
        Todos.getTodoById(req.params.id)
            .then(todo => {
                if (todo) {
                    Todos.updateTodo(req.params.id, req.body)
                        .then(todo => {
                            res.status(200).json(todo)
                        })
                        .catch(err => {
                            res.status(500).json({ error: err, message: 'Could not update to-do item.' })
                        })
                } else {
                    res.status(404).json({ errorMessage: 'A to-do item with the specified ID does not exist.' })
                }
            })
    }
})

// Delete To-Do Item

router.delete('/:id', (req, res) => {
    Todos.getTodoById(req.params.id)
        .then(todo => {
            if (todo) {
                Todos.deleteTodo(req.params.id)
                    .then(() => {
                        res.status(200).end();
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'To-do item could not be deleted.' })
                    })
            } else {
                res.status(400).json({ message: 'A to-do item with the specified ID does not exist.' })
            }
        })
})

module.exports = router;