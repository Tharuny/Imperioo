import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();



export async function POST(req) {
  try {
    const { name,parent } = await req.json();
   
    const sql = `INSERT INTO categories (categoryname,status) VALUES ($1,$2)`;
    const input = [name,parent];

    const result = await pool.query(sql,input);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}