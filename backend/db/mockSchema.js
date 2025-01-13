const mongoose = require('mongoose');
const {v4:uuidv4} = require('uuid')

const questionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    topicName: String,
    imageURL: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const mockSchema = new mongoose.Schema({
    exam: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        validate:{
            validator: v => v.length <= 180,
            message: "Array size must be less than equal to 180"
        }
    },
    uid: {
        type: String,
        unique: true,
        required: true,
        default: uuidv4
    }
})

module.exports = mongoose.model('mockSchema',mockSchema);