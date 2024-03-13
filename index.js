const exp = require('constants')
const express = require('express')
const http = require('http')
const Server = require('socket.io')
const cors = require('cors')


const app = express();
// app.use((req, res, next)=>{
//     res.setHeader("Access-Control-Allow-Origin", "*")
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
//     next()
// })
const server = http.createServer(app)

const io = Server(server, {
    cors:{
        methods: "GET, POST",
        origin: '*'
    }
})

io.on('connection', (socket)=>{
    console.log("Connected!");
    const messageInfo = {}

    socket.on("disconnect", ()=>{
        console.log("Disconnected.");
    })

    socket.on("new_message", (message)=>{
        messageInfo.text = message
        socket.broadcast.emit("broadcast_msg", messageInfo);
    })

    socket.on("join", (userName)=>{
        messageInfo.userName = userName;
    })
})

server.listen(7000, (err)=>{
    if(err){
        console.log("Err listening to port 7000");
    }else{
        console.log("Server listening on port 7000");
    }
})