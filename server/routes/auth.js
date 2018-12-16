module.exports=app=>{
    app.get("/api/auth",(req,res)=>{
        res.send({isAuth:true})
    })
}