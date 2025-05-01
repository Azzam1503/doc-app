import AuthOptions from "@/lib/authOptions";
import { client } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, {params}: {params: {documentId: string}}) => {
    try{
        console.log("update route called")
        const {documentId} = await params;

        const session = await getServerSession(AuthOptions);
        if(!session || !session.user){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        };

        const permission = await client.permission.findFirst({
            where:{
                documentId,
                userId: session.user.id,   
                role:{
                    in: ["OWNER"]
                }
            }
        });

        if(!permission){
            return NextResponse.json({message: "Unauthorized / No document found"}, {status: 404});
        };

        console.log(permission)

        const {title} = await req.json();
        console.log("title", title);
        await client.document.update({
            where:{
                id: documentId,
            },
            data:{
                title
            }
        })
        console.log("Document title updated", title);
        return NextResponse.json({message: "Document title updated"}, {status: 200});
        
    }catch(error){
        console.log(error);
        return NextResponse.json({message: "Internal server error", error}, {status: 500});
    }
}