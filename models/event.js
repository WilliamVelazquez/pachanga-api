const mongoose = require('mongoose')

const itemSchema = require('./item')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 30,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    items: {
        type: [itemSchema]
    },
    location:{
        type: String,
        minlength: 5,
        maxlength: 120,
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)