
const mongoose=require("mongoose")
const {User} =require("../models/user")
module.exports=app=>{
    app.post("/api/user/signup",(req,res)=>{
        console.log(req.body)
        const {FirstName,LastName,Password,NickName}=req.body
        const user=new User({FirstName,LastName,Password,NickName})
        user.save().then(user=>console.log(user))
     
    })
    app.post("/api/user/login",(req,res)=>{
        const {NickName,Password}=req.body
        User.findOne({NickName,Password}).then(doc=>{doc.isAuth=true;res.json({doc,isAuth:true})})

    })
}