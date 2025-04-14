import { createServer } from 'http';
import express from "express";
import { Server, Socket } from "socket.io";
const PORT = process.env.PORT || 4000;
import {PrismaClient} from "@prisma/client";

const app = express();

const client = new PrismaClient();

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

    socket.on("get-document", async (documentId: string)=>{

        const document = await client.document.findUnique({
            where:{
                id: documentId
            }
        });

        if(!document) return;
        
        console.log(document);

        socket.join(documentId);

        
        
        socket.emit("load-document", document.content);
        
        socket.on("document-change", (changes: string) => {
            // console.log(changes);
            socket.broadcast.to(documentId).emit("receive-changes", changes);
        })
    });
    
    socket.on("save-document", async (documentId: string, content: string)=>{
        await client.document.update({
            where:{
                id: documentId
            },
            data:{
                content
            }
        });
    })
});

server.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})