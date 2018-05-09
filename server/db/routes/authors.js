const db = require('../models'); // initial sequelize model
const express = require('express');
const router = express.Router();
// const Author = require("../models/author");
// const Blog = require("../models/blog");

router.get("/", (req, res) => {
    db.Author.findAll().then(authors => {
         res.status(200).json(authors);
    });
});

router.get("/:id", (req, res) => {
    db.Author.findById(req.params.id)
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
    db.Blog.findAll({ where: { authorId: req.params.id } })
        .then(blog => {
            res.status(200).json(blog);
        });
});

router.post("/", (req, res) => {
    db.Author.findById(req.params.id)
    .create({ 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email })
    .then(author => {
        res.status(201).json(author);
    });
});

router.put("/:id", (req, res) => {
    db.Author.findById(req.params.id)
    .save({ 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email })
        .then(author => {
            res.status(204).json(author);
        });
});

router.delete("/:id", (req, res) => {
    if (req.params.id) {
        db.Author.findById(req.params.id)
        .destroy()
        .then(author => {
            res.status(200);
        })
        .catch(err => res.status(400).send(err.message));
    } else {
        res.status(404).send("No ID sent as params");
    }
});

module.exports = router;