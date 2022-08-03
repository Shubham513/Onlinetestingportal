const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    option:[
        {
            type:String,
            required:true
        }
    ],
    answer:{
        type:Number,
        required:true
    }
})

const Exam = mongoose.model('exam',schema);

module.exports = Exam;