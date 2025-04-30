import AuthOptions from "@/lib/authOptions";
import { client } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async(req: NextRequest, {params}: {
    params:{documentId: string}
}) =>{
    try{
        const session = await getServerSession(AuthOptions);
        if(!session || !session.user){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        };

        const {documentId} = await params;

        const permisson = await client.permission.findFirst({
            where:{
                documentId,
                role: {
                    in: ["OWNER"]
                },
            }
        });
        if(!permisson){
            return NextResponse.json({message: "Document not found"}, {status: 404});
        };

        await client.permission.deleteMany({
            where:{
                documentId,
            }
        });
        await client.document.delete({
            where:{
                id: documentId,
            }
        });
        return NextResponse.json({message: "Document deleted"}, {status: 200});
    }catch(err){
        console.log(err);
    }
}