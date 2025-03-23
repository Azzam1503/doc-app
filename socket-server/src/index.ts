import { createServer } from 'http';
import express from "express";
import { Server, Socket } from "socket.io";
const PORT = process.env.PORT || 4000;

const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST"]
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

    socket.on("get-document", (documentId: string)=>{
        console.log(documentId);
        socket.join(documentId);
        
        socket.emit("load-document", "Hello World");
        
        socket.on("document-change", (changes: string) => {
            console.log(changes);
            socket.broadcast.to(documentId).emit("receive-changes", changes);
        })
    });
    
    
});

server.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})