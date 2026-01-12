import {prisma} from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";
export async function GET(){
    const data=await prisma.dictionary.findMany()
    return NextResponse.json({data})
}
