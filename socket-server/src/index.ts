import { createServer } from 'http';
import express from "express";
import { Server, Socket } from "socket.io";
const PORT = process.env.PORT || 4000;

const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*"
    }
});

app.get("/", (req: any, res: any)=>{
    res.send("Hello there!");
});

io.on("connection", (socket: Socket)=>{
    console.log("A new user connected", socket.id);
    socket.on("message", (data)=>{
        console.log(data);
        io.emit("message", data);
    })

    socket.send("Hello from the socket server");
    
});

server.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})