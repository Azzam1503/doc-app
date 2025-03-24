import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json();
        console.log(body);
    }catch(err){

    }
}