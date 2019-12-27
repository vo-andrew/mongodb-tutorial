const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch(err) {
        res.json({message: err})
    }
})

// GET A SPECIFIC POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch(err) {
        res.json({message: err})
    }
})

// SUBMIT A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch(err) {
        res.json({message:err});
    }  
})

// DELETE A POST
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.deleteOne({_id: req.params.id});
        res.json(post);
    } catch (err) {
        res.json({message:err});
    }
    
})

// UPDATE A POST
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.updateOne(
            {_id: req.params.id}, 
            {$set: {title: req.body.title}} 
        );
        res.json(post);
    } catch (err) {
        res.json({message:err});
    }
})

module.exports = router;