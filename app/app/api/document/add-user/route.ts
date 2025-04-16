import { NextRequest, NextResponse } from "next/server"
import {client} from "@/lib/db"
import { getServerSession } from "next-auth";
import AuthOptions from "@/lib/authOptions";

export const POST = async (req: NextRequest) =>{
    try {
        const session = await getServerSession(AuthOptions);
        if(!session || !session.user){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        };
        const {email, documentId, role} = await req.json();
        const userId = session.user.id;

        const ifAuthorized = await client.permission.findFirst({
            where:{
                userId,
                documentId,
                role: "OWNER"
            }
        });
        
        if(!ifAuthorized) return NextResponse.json({message: "Unauthorized"}, {status: 401});

        const ifUserExist = await client.user.findUnique({
            where:{
                email
            }
        });

        if(!ifUserExist) return NextResponse.json({message: "User not found"}, {status: 404});

        const ifAlreadyAdded = await client.permission.findFirst({
            where:{
                userId: ifUserExist.id,
                documentId
            }
        });

        if(ifAlreadyAdded) return NextResponse.json({message: "User already added"}, {status: 409});

        await client.permission.create({
            data:{
                userId: ifUserExist.id,
                documentId,
                role: "EDITOR"
            }
        });

        return NextResponse.json({message: "User added successfully"}, {status: 200});

    } catch (error) {
        console.log("Error while adding user", error);
        return NextResponse.json({message: "Error while adding user"}, {status: 500});
    }
}