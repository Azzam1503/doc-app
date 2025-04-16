import { NextRequest, NextResponse } from 'next/server';
import {client} from "@/lib/db";
 
export const GET = async (req: NextRequest, {params}:{
    params: {
        documentId: string
    }
}) =>{
    try {
        const {documentId} = await params;
        const users = await client.permission.findMany({
            where:{
                documentId,
                role: {
                    notIn: ["OWNER"]
                }
            },
            select: {
                userId: true,
                role: true,
                user: {
                    select:{
                        email: true,
                        name: true
                    }
                }
            },
        });

        console.log("permitted users are here-------",users);
        return NextResponse.json({users, message: "Hello there!"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error while fetching users"}, {status: 501});
    }
}