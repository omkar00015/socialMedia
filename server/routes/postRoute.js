const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

//Get All Post 
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate('createdBy');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create post 
router.post("/", async (req, res) => {
  try {
    const data = {
      postText: req.body.postText,
      createdAt: req.body.createdAt,
      createdBy: req.body.createdBy,
      imageUrl: req.body.imageUrl
    };

    const postResult = await Post.create(data);
    res.status(201).json(postResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;