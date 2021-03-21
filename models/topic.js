const mongoose = require('mongoose')

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    imageName: {
        type: String,
    },
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Forum'
    }

})

module.exports = mongoose.model('Topic', topicSchema)