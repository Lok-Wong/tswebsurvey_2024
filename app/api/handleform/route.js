import { NextResponse } from "next/server";
const fs = require('fs');

export async function GET(){
    const data = {
        name: 'Bishal Shrestha',
        age: '272'
    }

    return NextResponse.json({data})
}

export async function POST(req,res){
    const requestData = await req.json()
    console.log("requset is ",requestData["data"]["home"])
    fs.writeFileSync('temp/example.json', "testing")
    console.log("req.body")
    return NextResponse.json({"message":"Post data"})
}