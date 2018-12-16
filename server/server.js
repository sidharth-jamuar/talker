const express=require("express")
const http=require("http")
const mongoose=require("mongoose")
const config=require("./config/config").get(process.env.NODE_ENV)
const bodyParser=require("body-parser")
const socketIO=require("socket.io")
const app=express();
const server=http.createServer(app)
const io=socketIO(server)

//models

//db setup
mongoose.Promise=global.Promise;
mongoose.connect(config.DATABASE,{ useNewUrlParser: true })
//middlewares

app.use(bodyParser.json())
app.use(express.static('client/build'))
require("./routes/message")(app)
require("./routes/auth")(app)
require("./routes/user")(app)

//io 

//port setup
const PORT=process.env.PORT ||3004
var users=[];
io.on("connection",(socket)=>{
    console.log("hello ")
   socket.on("yourusername",(username)=>{
       
    socket.username=username
       user={
       username:socket.username,
       id:socket.id
   }
   console.log(socket.username)
 users.push(user)
    socket.emit("getusername",{username:socket.username})
 
        io.emit("userlist",users)
        
   })
 
    socket.on("newmessage",(message)=>{
        console.log(message)
        io.emit("addmessage",{from:socket.id,to:message.to,text:message.text})
    
    })
})

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}
server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})