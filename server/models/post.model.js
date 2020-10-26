const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Please provide title",
    },
    description: {
        type: String,
        max: 255
    },
    belongs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);