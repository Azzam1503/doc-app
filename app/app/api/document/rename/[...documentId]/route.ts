import AuthOptions from "@/lib/authOptions";
import { client } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, {params}: {params: {documentId: string}}) => {
    try{
        const {documentId} = await params;
        const session = await getServerSession(AuthOptions);
        if(!session || !session.user){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        };

        const permission = await client.permission.findFirst({
            where:{
                documentId,
                role:{
                    in: ["OWNER"]
                }
            }
        });

        if(!permission){
            return NextResponse.json({message: "Unauthorized / No document found"}, {status: 404});
        };

        const {title} = await req.json();

        await client.document.update({
            where:{
                id: documentId,
            },
            data:{
                title
            }
        })

        return NextResponse.json({message: "Document title updated"}, {status: 200});
        
    }catch(error){

    }
}