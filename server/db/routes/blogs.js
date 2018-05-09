const db = require('../models'); // initial sequelize model
const express = require('express');
const router = express.Router();
// const Author = require("../models/author");
// const Blog = require("../models/blog");

router.get("/", (req, res) => {
    db.Blog.findAll().then(blogs => {
        res.status(200).json(blogs);
    });
});

router.get("/:id", (req, res) => {
    db.Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
                res.status(200).json(author);
            } else {
                res.status(404).send("ID Not Found.");
            }
        })
        .catch(err => res.status(500).send(err.message));
});

router.get("/featured", (req, res) => {
    db.Blog.findAll({ where: { featured: true } })
        .then(blog => {
            res.status(200).json(blog);
        });
});

router.post("/", (req, res) => {
    db.Blog.findById(req.params.id)
        .create({
            title: req.body.title,
            authorId: req.body.authorId,
            article: req.body.article,
            featured: req.body.featured,
            published: req.body.published
        }, {
          include: [{
              association: Blog.Author,
              include: [ Author.Blog ]
          }]
        })
        .then(blog => {
            res.status(201).json(blog);
        });
});

router.put("/:id", (req, res) => {
    db.Blog.findById(req.params.id)
    .save({ 
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
        email: req.body.email })
        .then(author => {
            res.status(204).json(blog);
        });
});

router.delete("/:id", (req, res) => {
    if (req.params.id) {
        db.Blog.findById(req.params.id)
        .destroy()
        .then(blog => {
            res.status(200);
        })
        .catch(err => res.status(400).send(err.message));
    } else {
        res.status(404).send("No ID sent as params");
    }
});

module.exports = router;