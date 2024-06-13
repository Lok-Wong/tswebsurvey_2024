import { NextResponse } from "next/server";
import dayjs from 'dayjs';
import rateLimit from '@/app/utils/rateLimit.js';
import { useCookies } from "react-cookie";

const fs = require('fs');


export async function POST(req,res){
    if (await rateLimit(req, res)) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

    if (!fs.existsSync('tsStudentData')) {
        fs.mkdirSync('tsStudentData');
    }

    const savePath = `tsStudentData/${dayjs().format('YYYY-MM-DD')}`

    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }

    const requestData = await req.json()
    console.log("req",(requestData["data"]))
    const ipaddress = requestData["data"]['home']['ip']
    const uuid = requestData["data"]['home']['uuid']
    const fileDate = `${dayjs().format('HHmmss')}`
    const fileName = `${ipaddress}_${fileDate}_${uuid}.json`
    fs.writeFileSync(`${savePath}/${fileName}`, JSON.stringify(requestData))
    return NextResponse.json({"message":"Post data"})
}