const db = require("../models"); // initial sequelize model
const express = require("express");
const router = express.Router();
const Author = db.Author;
const Blog = db.Blog;

router.get("/", (req, res) => {
  Author.findAll().then(authors => {
    res.status(200).json(authors);
  });
});

router.get("/:id", (req, res) => {
  Author.findById(req.params.id)
    .then(author => {
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).send("ID Not Found.");
      }
    })
    .catch(err => res.status(500).send(err.message));
});

router.get("/:id/blogs", (req, res) => {
  Blog.findAll({ where: { authorId: req.params.id } }).then(blog => {
    res.status(200).json(blog);
  });
});

router.post("/", (req, res) => {
  Author
    .create(req.body)
    .then(author => {
      res.status(201).json(author);
    });
});

router.put("/:id", (req, res) => {
  Author.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(author => {
    res.status(204).json(author);
  });
});

router.delete("/:id", (req, res) => {
  if (req.params.id) {
    Author.destroy({
      where: {id: req.params.id}
    })
    .then(() => {
      res.status(200).send('OK');
    })
      .catch(err => res.status(400).send(err.message));
  } else {
    res.status(404).send("No ID sent as params");
  }
});

module.exports = router;
