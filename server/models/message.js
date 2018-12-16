const mongoose=require("mongoose")
const {Schema} =mongoose;

const messageSchema=new Schema({
    fromUser:{type:String,default:"Bot"},
    toUser:{type:String,default:"Bot"},
    message:{type:String},
    
},{timestamps:true})

const Message=mongoose.model("messages",messageSchema)
module.exports={Message}