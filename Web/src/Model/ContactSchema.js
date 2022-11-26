
const mongoose = require("mongoose")
const validator = require("validator")

const contactSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email Id")
            }
        }
    },
    message:{
        type:String,
        required:true,
        trim:true
    }
},
{timestamps:true}
)


module.exports = mongoose.model("Contact",contactSchema)




