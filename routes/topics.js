const express = require('express')
const router = express.Router()
const Topic = require('../models/topic')
const Forum = require('../models/forum')

// All topics route
router.get('/', async (req, res) => {
  res.send('All Books')
})

// New topic route
router.get('/new', async (req, res) => {
	try {
        const forums = await Forum.find({})
        const topic = new Topic()
        res.render('topics/new', {
            forums: forums,
            topic: topic
        })
    } catch {
        res.redirect('/topics')
    }
})

// Create topic route
router.post('/', async (req, res) => {
	res.send('create book')
})

module.exports = router