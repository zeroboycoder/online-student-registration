const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : String,
    content : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('feedback', feedbackSchema);