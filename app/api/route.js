import { NextResponse } from "next/server";
import pool from "@/app/config/mysql";

export async function GET(){
    try{
        const db = await pool.getConnection();
        const query = await db.query("SELECT * FROM test_table");
        const [rows] = await db.execute(query);
        db.release();

        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error},{status: 500})
    }
}