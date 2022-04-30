const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const Pie_Two_Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength:200,
    }, 
    pie:{
        type: ObjectId,
        ref: 'Pie',
        required: true,
    }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model('PieTwoSchema', Pie_Two_Schema);