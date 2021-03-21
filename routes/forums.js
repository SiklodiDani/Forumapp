const express = require('express')
const { route } = require('.')
const router = express.Router()

// All forums route
router.get('/', (req, res) => {
    res.render('forums/index')
})

// New forum route
router.get('/new', (req, res) => {
    res.render('forums/new')
})

// Create forum route
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router