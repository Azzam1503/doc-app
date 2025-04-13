import { NextRequest, NextResponse } from "next/server";
import {client} from "@/lib/db";
import bcryptjs from "bcryptjs";
import * as z from  "zod";

const userSchema = z
  .object({
    name: z.string().min(1, "Enter you name"),
    email: z.string().email("This is not a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });


export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json();
        console.log(body);

        if(!body.name || !body.email || !body.password){
            return NextResponse.json({message: "Please fill all the fields"},{status: 400});
        };

        userSchema.parse(body);
        console.log("this is the body", body);
        
        const existingUser = await client.user.findFirst({
            where:{
                email: body.email
            }
        });

        if(existingUser){
            return NextResponse.json({message: "User already exists"},{status: 400});
        }

        const hashedPassword = bcryptjs.hashSync(body.password, 10);

        console.log(hashedPassword)

        await client.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        });

        return NextResponse.json({message: "User created"},{status: 200});
    }catch(err){
        console.log(err);
        return NextResponse.json({message: "User created", err},{status: 500});
    }
}