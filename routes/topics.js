const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Topic = require('../models/topic')
const uploadPath = path.join('public', Topic.topicImageBasePath)
const Forum = require('../models/forum')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// All topics route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if(req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try{
        const topics = await Topic.find(searchOptions)
        res.render('topics/index', {
            topics: topics,
            searchOptions: req.query
        })
    }catch{
        res.redirect('/')
    }
})

// New topic route
router.get('/new', async (req, res) => {
	renderNewPage(res, new Topic())
})

// Create topic route
router.post('/', upload.single('image'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
	const topic = new Topic({
        title: req.body.title,
        forum: req.body.forum,
        description: req.body.description,
        imageName: fileName
    })

    try{
        const newTopic = await topic.save()
        res.redirect(`topics`)
    } catch {
        if(topic.imageName != null) {
            removeTopicImage(topic.imageName)
        }
        renderNewPage(res, topic, true)
    }
})

function removeTopicImage(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if(err) console.error(err)
    })
}

async function renderNewPage(res, topic, hasError = false) {
    try {
        const forums = await Forum.find({})        
        const params = {
            forums: forums,
            topic: topic
        }
        if(hasError) params.errorMessage = 'Error creating book'
        res.render('topics/new', params)
    } catch {
        res.redirect('/topics')
    }
}

module.exports = router