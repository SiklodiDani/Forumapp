const express = require('express')
const router = express.Router()
const Topic = require('../models/topic')

router.get('/', async (req, res) => {
    let topics
    try {
        topics = await Topic.find().sort({ createdAt: 'desc' }).limit(15).exec()
    } catch {
        topics = []
    }
    res.render('index', { topics: topics })
})

module.exports = router