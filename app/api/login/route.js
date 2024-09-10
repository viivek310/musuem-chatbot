import { NextResponse } from "next/server";

export async function POST(request){
    console.log("login route")
    return NextResponse.json({"success": true})
    
}