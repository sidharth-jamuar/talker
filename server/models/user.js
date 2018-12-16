const mongoose=require("mongoose")
const {Schema} =mongoose

const userSchema=new Schema({
    FirstName:{type:String,default:"Bot"},
    LastName:{type:String,default:"Bot"},
    Password:{type:String,unique:1},
    NickName:{type:String,unique:1},
    token:{type:String}
})
const User=mongoose.model("user",userSchema)

module.exports={User}