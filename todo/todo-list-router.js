const router = require('express').Router();

const db = require('../data/dbConfig');
const restricted = require('../auth/restricted-middleware');

router.get("/", restricted, (req, res) => {
  db('todo')
    .returning('id')
    .where({ user_id: req.decodedToken.subject })
    .then(todos => {
        res.status(200).json(todos)
    })
    .catch(err => {
      res.status(500).json({ error: err, message: 'To-do list could not be retrieved.' });
    });
});

router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;

  db('todo')
    .returning('id')
    .where({ id, user_id: req.decodedToken.subject })
    .first()
    .then(todo => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).json({ errorMessage: 'A to-do item with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err, message: 'There was an error retrieving to-do item from your list.' });
    });
});

router.post("/", restricted, (req, res) => {
  if (!req.body.item) {
    res.status(400).json({ errorMessage: 'To-do items cannot be left blank.' });
  } else {
    req.body.user_id = req.decodedToken.subject;
    db('todo')
      .returning('id')
      .insert(req.body)
      .then(ids => {
        const id = ids[0];
        db('todo')
          .returning('id')
          .where({ id })
          .first()
          .then(todo => {
            res.status(201).json(todo);
          });
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error saving to-do item to your list.' });
      });
  }
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;

  if (!req.body.item) {
    res.status(400).json({ errorMessage: 'To-do items cannot be left blank.' });
  } else {
    db('todo')
      .where({ id, user_id: req.decodedToken.subject })
      .update(req.body)
      .returning('id')
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({ errorMessage: 'A to-do item with the specified ID does not exist.' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err, message: 'There was an error saving to-do item to your list.' });
      });
  }
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  db('todo')
    .where({ id, user_id: req.decodedToken.subject })
    .del()
    .returning("id")
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ errorMessage: 'A to-do item with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err, message: 'There was an error removing to-do item from your list.' });
    });
});

module.exports = router;