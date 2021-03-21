const express = require('express')
const forum = require('../models/forum')
const router = express.Router()
const Forum = require('../models/forum')

// All forums route
router.get('/', async (req, res) => {
    try{
        const forums = await Forum.find({})
        res.render('forums/index', {forums: forums})
    }catch{
        res.redirect('/')
    }
})

// New forum route
router.get('/new', (req, res) => {
    res.render('forums/new', { forum: new Forum() })
})

// Create forum route
router.post('/', async (req, res) => {
    const forum = new Forum({
        title: req.body.title
    })
    try{
    	const newForum = await forum.save()
        res.redirect('forums')
    }catch{
		res.render('forums/new', {
            forum: forum,
            errorMessage: 'Error creating forum'
        })
    }
})

module.exports = router