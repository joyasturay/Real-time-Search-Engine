import {prisma} from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest){
   const searchParams = request.nextUrl.searchParams;
   const word=searchParams.get("q")
   if(!word){
    return NextResponse.json({
        message:"not provided word"
    },{
        status:400
    })
   }
   const data=await prisma.dictionary.findFirst({
    where:{
       englishWord:{
            contains:word,
            mode:"insensitive"
            
        }
    }
   })
   return NextResponse.json({word:data})
}
