const db = require("../models"); // initial sequelize model
const express = require("express");
const router = express.Router();
const Author = db.Author;
const Blog = db.Blog;

router.get("/", (req, res) => {
  Blog.findAll().then(blogs => {
    res.status(200).json(blogs);
  });
});

router.get("/featured", (req, res) => {
  Blog.findAll({
    where: {
      featured: true
    }
  }).then(blogs => {
    res.status(200).json(blogs);
  });
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then(blogs => {
      if (blogs) {
        res.status(200).json(blogs);
      } else {
        res.status(404).send("ID Not Found.");
      }
    })
    .catch(err => res.status(500).send(err.message));
});

// router.post("/", (req, res)=>{
//   const authorId = req.query.authorId;

//   // Create your row
//   Blog.create({
//     ...req.body,
//     authorId: authorId
//   }).then(blog => {
//     res.status(201).send(blog);
//   });

// });

router.post("/", (req, res) => {
  var obj = req.body;
  obj.authorId = req.query.authorId;
  console.log(obj);
  Blog.create({ ...obj }).then(blogs => {
    res.status(201).json(blogs);
  });
});

router.put("/:id", (req, res) => {
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(blogs => {
    res.status(204).json(blogs);
  });
});

router.delete("/:id", (req, res) => {
  if (req.params.id) {
    Blog.destroy({
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
