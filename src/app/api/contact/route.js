import pool from "utils/db";
import dotenv from 'dotenv';
dotenv.config();

export async function POST(req){
  const {firstName,lastName,email,mobile}=await req.json();
  try {
    const sql = 'INSERT INTO userContactDetails(first_name, last_name, email,mobile) VALUES ($1, $2, $3,$4)';
    const values = [firstName, lastName, email,mobile];
    const result=await pool.query(sql, values);
    return new Response(JSON.stringify({ success: true}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}