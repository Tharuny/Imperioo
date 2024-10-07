import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();


export async function POST(req) {
  try {
    const { firstname,lastname, email,phoneNumber, password ,status} = await req.json();

    if (!firstname || !lastname|| !email || !password || !phonenumber || !status) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = 'INSERT INTO users (firstname,lastname, email,phoneNumber, password,status) VALUES ($1, $2, $3,$4, $5,$6)';
    const inputs = [firstname,lastname, email,phoneNumber, password,status];

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

export async function GET() {
  try {

    const sql = "select * from users where userid = 'ABFU0004'";

    const result = await pool.query(sql);

    return new Response(JSON.stringify(result.rows));
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}