import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import AuthOptions from "@/lib/authOptions";
import {client} from "@/lib/db";

export const GET = async (req: NextRequest) =>{
    console.log("hemlooooooooo");
    try { 
        const session = await getServerSession(AuthOptions);
        console.log("session on the route",session);
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

        
        const documents = await client.permission.findMany({
            where:{
                userId,
                role: "OWNER"
            },
            // include:{
            //     document: true
            // }
        })

        

        console.log(documents);

        return NextResponse.json({documents}, {status: 200});      
        
    } catch (error) {
        return NextResponse.json({message: "Error while creating the document"}, {status: 501});   
    }
}