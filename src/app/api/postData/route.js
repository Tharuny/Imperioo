import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();


export async function POST(req) {
  try {
    const { first_name,last_name, email,phone_number, password } = await req.json();

    if (!first_name || !last_name|| !email || !password || !phone_number) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = 'INSERT INTO users (first_name,last_name, email,phone_number, password) VALUES ($1, $2, $3,$4, $5)';
    const inputs = [first_name,last_name, email,phone_number, password];

    const result = await pool.query(sql, inputs);

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