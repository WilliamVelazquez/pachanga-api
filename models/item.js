const { Schema } = require('mongoose')

const itemSchema = new Schema({
    name:{
        type: String,
        minlength: 5,
        maxlength: 30,
        required: true
    },
    quantity:{
        type: Number,
        minlength: 1,
        default: 1
    },
    carrier:{
        type: String,
        minlength: 1,
        maxlength: 30
    }
})

module.exports = itemSchema