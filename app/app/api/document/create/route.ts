import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AuthOptions from "@/lib/authOptions";
import {client} from "@/lib/db";

export const POST = async (req: NextRequest) =>{
    try { 
        const session = await getServerSession(AuthOptions);
        
        if(!session || !session.user){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        };

        const userId = session.user.id;

        const user = await client.user.findFirst({
            where:{
                id: userId
            }
        });

        if(!user) return NextResponse.json({message: "No user found"}, {status: 401});

        const newDoc = await client.document.create({
            data: {
                userId,
                content: {}
            }
        });
        console.log(newDoc);
        return NextResponse.json({message: "dou"}, {status: 200});      
        
    } catch (error) {
        return NextResponse.json({message: "Error while creating the document"}, {status: 501});   
    }
}