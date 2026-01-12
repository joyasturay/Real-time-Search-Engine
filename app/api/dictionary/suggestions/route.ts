import {prisma} from "@/lib/prisma"
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest){
    const word=request.nextUrl.searchParams.get("q")
    if(!word){
        return NextResponse.json({
            message:"word not found"
        },{
            status:400
        })
    }
    const data=await prisma.dictionary.findMany({
        where:{
            englishWord:{
                contains:word,
                mode:"insensitive"
            }
        },
        take:5
    })
    return NextResponse.json({word:data})
}
