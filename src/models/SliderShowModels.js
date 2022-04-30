const mongoose = require('mongoose')

const SliderShowSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            trim: true, 
            require: true, 
            maxlength: 32
        }, 
        description: {
            type: String, 
            trim: true, 
            require: true, 
            maxLength: 2000
        }, 
        photo:{
            data:Buffer, 
            contentType:String
        }
    }, 
    {timestamps:true}
); 

module.exports = mongoose.model("SliderShow", SliderShowSchema)